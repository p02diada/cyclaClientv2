import {Page, NavController, Alert, Storage, LocalStorage, Events} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http} from 'angular2/http';
import {SelectUserPage} from '../select-user/select-user';
import {FirstPage} from '../first-page/first-page';





@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

	loginForm: ControlGroup;
    usuario: AbstractControl;
    contraseña: AbstractControl;
  
  constructor(form:FormBuilder, http:Http, nav:NavController, events:Events) {

  	this.nav=nav;
  	this.http=http;
    this.local=new Storage(LocalStorage);
    this.events=events;
  	this.loginForm = form.group({
  		usuario: ['', Validators.compose([Validators.required])],
  		contraseña: ["", Validators.required]
  	})

  }

  login(event){


  	user=this.loginForm.value;



	this.http.post('http://127.0.0.1:8000/api-token-auth/', 'username=' + user.usuario + '&password=' + user.contraseña, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    })
    .subscribe(success => {
    	console.log("BIENNNN");
      console.log(success);
      data=success.json();
      this.local.set('username', user.usuario);
      this.local.set('token', data.token);

      this.http.get("http://127.0.0.1:8000/usuarios/getIdUsuario/"+user.usuario+"/")
      .subscribe(success=>{
        
        data=success.json();
        this.local.set('id_usuario', data.id_usuario);
      });

      this.http.get("http://127.0.0.1:8000/usuarios/getTipoUsuario/"+user.usuario+"/")
      .subscribe(success=>{
        
        data=success.json();
        this.local.set('esRemitente', data.esRemitente);
        this.events.publish('user:login');
      });


      //console.log(request.user);
      //console.log(request.auth);
      this.nav.setRoot(FirstPage);
    }, error => {
    	console.log("MALLLLL");
      console.log(error);
    	let alert = Alert.create({
                title: 'Error de autentificación',
                subTitle: 'Compruebe que el usuario y contraseña introducidos son los correctos',
                buttons: ['Ok']
            });
            this.nav.present(alert);
    });
  }

  event.preventDefault();



  abrirPagina(){
  	this.nav.push(SelectUserPage);
  }

}


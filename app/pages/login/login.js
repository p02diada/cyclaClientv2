import {Page, NavController, Alert} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http} from 'angular2/http';
import {SelectUserPage} from '../select-user/select-user';




@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

	loginForm: ControlGroup;
    usuario: AbstractControl;
    contraseña: AbstractControl;
  
  constructor(form:FormBuilder, http:Http, nav:NavController) {

  	this.nav=nav;
  	this.http=http;
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
    }, error => {
    	console.log("MALLLLL");
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


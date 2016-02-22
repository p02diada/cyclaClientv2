import {Page, NavController, NavParams, Alert} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http} from 'angular2/http';
import {FirstPage} from '../first-page/first-page';


/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {


	registerForm: ControlGroup;
    usuario: AbstractControl;
    contraseña: AbstractControl;


  constructor(form:FormBuilder, http:Http, nav: NavController, navParams: NavParams) {
  	this.nav=nav;
  	this.http=http;
  	this.navParams=navParams;
  	this.remitente=navParams.get("remitente");
  	this.registerForm = form.group({
  		usuario: ['', Validators.compose([Validators.required])],
  		contraseña: ["", Validators.required]
  	})

  }

  registro(){
  	user=this.registerForm.value;
  	console.log(user.usuario);
  	console.log(user.contraseña);
  	console.log(this.remitente);
  	
  	var u = {
        "username": user.usuario,
        "password": user.contraseña,

    }
    console.log(u);

    if (this.remitente==true){

    

 	this.http.post('http://127.0.0.1:8000/usuarios/registrarRemitente/', 'username='+user.usuario+ '&password=' + user.contraseña, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    })
    .subscribe(success => {
    	console.log("BIENNNN");
      this.nav.setRoot(FirstPage);
    }, error => {
    	console.log("MALLLLL");
    	let alert = Alert.create({
                title: 'Error de autentificación',
                subTitle: 'Compruebe que el usuario y contraseña introducidos son los correctos',
                buttons: ['Ok']
            });
            this.nav.present(alert);
    });

  } else {

      this.http.post('http://127.0.0.1:8000/usuarios/registrarCiclista/', 'username='+user.usuario+ '&password=' + user.contraseña, {
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



  }

}

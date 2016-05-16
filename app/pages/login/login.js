import {Page, NavController, Alert, Storage, LocalStorage, Events} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
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
      this.actualizarPosicion();
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

actualizarPosicion(){
 this.getTokenID();  
 var timer= setInterval(this.obtenerPosicion,5000);
 var timer2= setInterval(this.enviarPosicion,5000);
 //this.enviarPosicion();
}

obtenerPosicion(){

  function geo_success(position) {

    this.latitude=position.coords.latitude;
    this.longitude=position.coords.longitude;


  }

  function geo_error() {
    alert("Sorry, no position available.");
  }

  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 0, 
    timeout           : 50000
  };
  var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  console.log(this.latitude+' '+this.longitude);

}


enviarPosicion(){
  if (typeof this.latitude != 'undefined' && typeof this.longitude != 'undefined')
  {
    console.log(this.local);
    var token=this.token;
    var id_usuario=this.id_usuario;
    var headers= new Headers();
    console.log('latitud: '+this.latitude);
    datos="longitud_ciclista=4.7847038"+"&latitud_ciclista=37.8761787"+"&id_ciclista="+id_usuario;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token e31e642fa2aa05743309a9a4deef815302c6c287');
    this.http.post('http://127.0.0.1:8000/usuarios/setPosicionCiclista/',datos,{
      headers:headers
    }).subscribe(success =>{
      console.log(success);
    }

  }
}

getTokenID(){
    this.token=this.local.get('token')._result;
    this.id_usuario=this.local.get('id_usuario')._result;

}



}


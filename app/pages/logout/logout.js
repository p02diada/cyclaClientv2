import {Page, NavController, Alert, Storage, LocalStorage, Events} from 'ionic/ionic';
import {LoginPage} from '../login/login';

/*
  Generated class for the LogoutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/logout/logout.html',
})
export class LogoutPage {
  constructor(nav: NavController, events:Events) {
    this.nav = nav;
    this.local=new Storage(LocalStorage);
    this.events=events;
    this.cerrarSesion();
  }

  cerrarSesion(event){
  	
  	this.local.remove('username');
  	this.local.remove('token');
  	this.local.remove('id_usuario');
  	this.local.remove('esRemitente');

    this.events.publish('user:logout');

  	this.nav.push(LoginPage);

  }
}

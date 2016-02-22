import {Page, NavController, Alert} from 'ionic/ionic';

/*
  Generated class for the SelectUserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
import {RegisterPage} from '../register/register';

@Page({
  templateUrl: 'build/pages/select-user/select-user.html',
})
export class SelectUserPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }

  registroRemitente(){

  this.nav.push(RegisterPage, {
        remitente: true,
        
   });

  }

  registroCiclista(){

  this.nav.push(RegisterPage, {
        remitente: false,
        
   });

  }



}

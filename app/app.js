import {App, IonicApp, Platform,Storage, LocalStorage, Events} from 'ionic/ionic';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SelectUserPage} from './pages/select-user/select-user';
import {NewDeliveryPage} from './pages/new-delivery/new-delivery';
import {ListDeliveriesPage} from './pages/list-deliveries/list-deliveries';
import {NewBidPage} from './pages/new-bid/new-bid';
import {ListOwnDeliveriesPage} from './pages/list-own-deliveries/list-own-deliveries';
import {SendingListRemitentePage} from './pages/sending-list-remitente/sending-list-remitente';
import {SendingDetailsCiclistaPage} from './pages/sending-details-ciclista/sending-details-ciclista';
import {LogoutPage} from './pages/logout/logout';
import {Http, Headers} from 'angular2/http';
//import {Push} from 'ionic-native';

@App({
  templateUrl: 'build/app.html',
  //ESTO NO ESTA IGUALLLL
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  constructor(app: IonicApp, platform: Platform, events:Events) {

    this.app=app;
    this.platform=platform;
    this.events=events;
    this.local=new Storage(LocalStorage);
    this.initializeApp();

    this.pages=[
      {title: 'Login', component: LoginPage, hide: true },
      {title: 'Select User', component: SelectUserPage, hide: true},
      {title: 'Públicar Envío', component: NewDeliveryPage, icon:'add', hide:true},
      {title: 'Lista de Anuncios', component: ListDeliveriesPage, icon:'list', hide:true},
      //{title: 'Nueva oferta', component: NewBidPage, hide:false}
      {title: 'Mis Anuncios', component: ListOwnDeliveriesPage, icon:'list', hide:true}
      {title: 'Envíos', component: SendingListRemitentePage, icon:'bicycle', hide:true}
      {title: 'Envío actual', component: SendingDetailsCiclistaPage, icon:'bicycle', hide:true}
      {title: 'Cerrar sesion', component: LogoutPage, icon:'log-out', hide:false}
    ];

    this.rootPage = LoginPage;
    this.listenToLoginEvents();
  }



  initializeApp(){

    this.platform.ready().then(() => {
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    };

    /*var push = Push.init({
      android: {
        senderID: "cyclaserver"
      },

});
    console.log(Push.hasPermission());

    });*/
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  listenToLoginEvents(){
    
    this.events.subscribe('user:login',()=>{
    var esRemitente=this.local.get('esRemitente')._result;
    this.elegirMenu(esRemitente); 

    });
  }

  elegirMenu(esRemitente){

   
    if(esRemitente=="true"){
      
      
      this.findMenuItemByTitle('Públicar Envío').hide = false;
      this.findMenuItemByTitle('Lista de Anuncios').hide = true;
      this.findMenuItemByTitle('Mis Anuncios').hide = false;
      this.findMenuItemByTitle('Envíos').hide = false;
      this.findMenuItemByTitle('Envío actual').hide = true;

    } else {
      
      this.findMenuItemByTitle('Públicar Envío').hide = true;
      this.findMenuItemByTitle('Lista de Anuncios').hide = false;
      this.findMenuItemByTitle('Mis Anuncios').hide = true;
      this.findMenuItemByTitle('Envíos').hide = true;
      this.findMenuItemByTitle('Envío actual').hide = false;


    }
  }

  findMenuItemByTitle(title) {
    return this.pages.find((menuItem) => {
      return menuItem.title === title
    })
  }    





}

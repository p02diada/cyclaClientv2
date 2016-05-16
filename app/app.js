import {App, IonicApp, Platform,Storage, LocalStorage, Events} from 'ionic/ionic';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SelectUserPage} from './pages/select-user/select-user';
import {NewDeliveryPage} from './pages/new-delivery/new-delivery';
import {ListDeliveriesPage} from './pages/list-deliveries/list-deliveries';
import {NewBidPage} from './pages/new-bid/new-bid';
import {ListOwnDeliveriesPage} from './pages/list-own-deliveries/list-own-deliveries';
import {SendingListRemitentePage} from './pages/sending-list-remitente/sending-list-remitente';
import {Http, Headers} from 'angular2/http';

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
      {title: 'Públicar Envío', component: NewDeliveryPage, hide:false},
      {title: 'Lista de Anuncios', component: ListDeliveriesPage, hide:false},
      //{title: 'Nueva oferta', component: NewBidPage, hide:false}
      {title: 'Mis Anuncios', component: ListOwnDeliveriesPage, hide:false}
      {title: 'Envíos', component: SendingListRemitentePage, hide:false}
    ];

    this.rootPage = LoginPage;
    this.listenToLoginEvents();
  }



  initializeApp(){

    this.platform.ready().then(() => {
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
/*
      var timer= setInterval(function(){
        function geo_success(position) {
          console.log(position.coords.latitude, position.coords.longitude);
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

      },5000);*/
    });
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

    } else {
      
      this.findMenuItemByTitle('Login').hide = true;
      this.findMenuItemByTitle('Públicar Envío').hide = true;
      this.findMenuItemByTitle('Mis Anuncios').hide = true;
      this.findMenuItemByTitle('Envíos').hide = true;


    }
  }

  findMenuItemByTitle(title) {
    return this.pages.find((menuItem) => {
      return menuItem.title === title
    })
  }    





}

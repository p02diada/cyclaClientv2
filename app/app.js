import {App, IonicApp, Platform,Storage, LocalStorage, Events} from 'ionic/ionic';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SelectUserPage} from './pages/select-user/select-user';
import {NewDeliveryPage} from './pages/new-delivery/new-delivery';
import {ListDeliveriesPage} from './pages/list-deliveries/list-deliveries';


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
    ];

    this.rootPage = LoginPage;
    this.listenToLoginEvents();
  }



  initializeApp(){

    this.platform.ready().then(() => {
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
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

    } else {
      
      this.findMenuItemByTitle('Login').hide = false;

    }
  }

  findMenuItemByTitle(title) {
    return this.pages.find((menuItem) => {
      return menuItem.title === title
    })
  }    





}

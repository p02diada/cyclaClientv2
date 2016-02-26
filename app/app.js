import {App, IonicApp, Platform} from 'ionic/ionic';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SelectUserPage} from './pages/select-user/select-user';
import {NewDeliveryPage} from './pages/new-delivery/new-delivery';


@App({
  templateUrl: 'build/app.html',
  //ESTO NO ESTA IGUALLLL
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    this.app=app;
    this.platform=platform;
    this.initializeApp();

    this.pages=[
      {title: 'Login', component: LoginPage },
      {title: 'Select User', component: SelectUserPage},
      {title: 'Públicar Envío', component: NewDeliveryPage}
    ];

    this.rootPage = LoginPage;
  }



  initializeApp(){

    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
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





}

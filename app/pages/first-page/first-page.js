import {Page, NavController, MenuController} from 'ionic/ionic';

/*
  Generated class for the FirstPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/first-page/first-page.html',
})
export class FirstPage {
  constructor(nav: NavController, menu: MenuController) {
    this.nav = nav;
    this.menu=menu;
    this.menu.open()
  }
}

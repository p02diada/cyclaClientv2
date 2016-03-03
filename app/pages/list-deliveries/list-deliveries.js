import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the ListDeliveriesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/list-deliveries/list-deliveries.html',
})
export class ListDeliveriesPage {
  constructor(nav: NavController, http:Http) {
    this.nav = nav;
    this.http=http;
    this.local=new Storage(LocalStorage);
    this.listaAnuncios=[];
    this.cargarLista();

  }

  cargarLista(){

  var token=this.local.get('token')._result; 
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://127.0.0.1:8000/envios/getAnuncios/',{
  	headers:headers
  })
  .subscribe(success =>{
  	console.log(success);
  	this.listaAnuncios=success.json();
  	console.log(this.listaAnuncios);
  }), error => {
  	console.log(error);
  }

  }
}

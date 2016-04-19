import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import {BidsForDeliveryPage} from '../bids-for-delivery/bids-for-delivery';
/*
  Generated class for the ListOwnDeliveriesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/list-own-deliveries/list-own-deliveries.html',
})
export class ListOwnDeliveriesPage {
  constructor(nav: NavController, http: Http) {
    this.nav = nav;
    this.http=http;
    this.local=new Storage(LocalStorage);
    this.cargarLista();
  }

  cargarLista(){

  
  var token=this.local.get('token')._result;
  var id_usuario=this.local.get('id_usuario')._result;
  var datos="id_usuario="+id_usuario;
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://127.0.0.1:8000/envios/getMisAnuncios/',datos,{
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

  verOfertas(anuncio){

  	this.nav.push(BidsForDeliveryPage,{
  		anuncio:anuncio,
  	});
  }

}

import {Page, NavController, NavParams, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the BidsForDeliveryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/bids-for-delivery/bids-for-delivery.html',
})
export class BidsForDeliveryPage {
  constructor(nav: NavController, navParams: NavParams, http:Http) {
    this.nav = nav;
    this.navParams=navParams;
    this.http=http;
    this.local=new Storage(LocalStorage);
    this.anuncio=navParams.get("anuncio");
    this.cargarListaOfertas();
  }

  cargarListaOfertas(){

  var token=this.local.get('token')._result;
  var id_usuario=this.local.get('id_usuario')._result;
  var datos="id_anuncio="+this.anuncio.pk;
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://127.0.0.1:8000/envios/getOfertasParaAnuncio/',datos,{
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

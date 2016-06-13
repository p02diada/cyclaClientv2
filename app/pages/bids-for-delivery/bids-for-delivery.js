import {Page, NavController, NavParams, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import {ListOwnDeliveriesPage} from '../list-own-deliveries/list-own-deliveries';

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
  this.http.post('http://p02diada.pythonanywhere.com/envios/getOfertasParaAnuncio/',datos,{
  	headers:headers
  })
  .subscribe(success =>{
  	console.log(success);
  	lista=success.json();
    this.ofertas=lista.listaOfertas;
    datosCiclistas=lista.listaDatosCiclista;
    for(i=0;i<this.ofertas.length;i++)
    {
      this.ofertas[i].username=datosCiclistas[i].username;
      this.ofertas[i].valoracionMedia=datosCiclistas[i].valoracionMedia;
    }
    console.log(this.ofertas);


  }), error => {
  	console.log(error);
  }

  }

  aceptarOferta(oferta){
    console.log(oferta);
    var token=this.local.get('token')._result;
    var datos="id_anuncio="+oferta.anuncio+"&id_oferta="+oferta.pk;
    var headers= new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token); 
    this.http.post('http://p02diada.pythonanywhere.com/envios/aceptarOferta/',datos,{
      headers:headers
    })
  .subscribe(success =>{
    console.log("bien");
    this.nav.setRoot(ListOwnDeliveriesPage);


  }), error => {
    console.log(error);
  }

  }
}

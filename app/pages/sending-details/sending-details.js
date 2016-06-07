import {Page, NavController, NavParams, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

/*
Generated class for the SendingDetailsPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Page({
	templateUrl: 'build/pages/sending-details/sending-details.html',
})
export class SendingDetailsPage {
	constructor(nav: NavController, navParams: NavParams, http:Http) {
		this.nav = nav;
		this.navParams=navParams;
		this.http=http;
		this.envio=navParams.get("envio");
		this.anuncio=navParams.get("anuncio");
		this.oferta=navParams.get("oferta")
		this.local=new Storage(LocalStorage);
		this.ciclista={};
		this.cargarMapa();

	}

	cargarMapa(){
		
	anuncio=this.anuncio
	//console.log(this.envio);
	//console.log(this.anuncio);
	//console.log(this.oferta);

	setTimeout(function(){


    var latlng = new google.maps.LatLng(37.8881751, -4.7793835);
    var mapOptions = {
      zoom: 15,
      center: latlng
    }

    map = new google.maps.Map(document.getElementById("map1"), mapOptions);
    //console.log(anuncio.latitudPuntoInicial);
    var latlngInicial = new google.maps.LatLng(anuncio.latitudPuntoInicial, anuncio.longitudPuntoInicial);
    var latlngFinal = new google.maps.LatLng(anuncio.latitudPuntoFinal, anuncio.longitudPuntoFinal);
    var markerInicial = new google.maps.Marker({
            map: map,
            label: 'A',
            position: latlngInicial
    });

     var markerFinal = new google.maps.Marker({
            map: map,
            label: 'B',
            position: latlngFinal
    });

}, 500, anuncio);

	console.log(this.latitudCiclista);
	this.hola=this.obtenerPosicionCiclista();
	console.log(this.hola);



}

obtenerPosicionCiclista(){

  var token=this.local.get('token')._result;
  var id_usuario=this.local.get('id_usuario')._result;
  var datos="id_ciclista="+this.oferta.ciclista;
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  return this.http.post('http://127.0.0.1:8000/envios/getPosicionCiclistaPorId/',datos,{
  	headers:headers
  })
  .subscribe(success=>{
  	console.log(success);
  	this.latitudCiclista=success.json();
  	console.log(this.latitudCiclista);
  	return this.latitudCiclista;
  }), error=>{
  	console.log(error);
  }		
	}



}

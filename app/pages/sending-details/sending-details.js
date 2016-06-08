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
    //var latlngCiclista = new google.maps.LatLng(this.posicionCiclista.latitudCiclista, this.posicionCiclista.longitudCiclista);
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
	this.obtenerPosicionCiclista().subscribe(
    (posicionCiclista)=>{
      this.posicionCiclista=posicionCiclista;
    });
	this.timer=setInterval(this.dibujarPosicionCilista.bind(this), 5000);



}

  dibujarPosicionCilista(){
    console.log(this.posicionCiclista);
    var latlngCiclista = new google.maps.LatLng(this.posicionCiclista.latitudCiclista, this.posicionCiclista.longitudCiclista);
    if (typeof this.markerFinal != 'undefined'){
      var latlngCiclista = new google.maps.LatLng(this.posicionCiclista.latitudCiclista, this.posicionCiclista.longitudCiclista);
      this.markerFinal.setPosition(latlngCiclista);


    }else{


      this.markerFinal = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.BOUNCE,
            position: latlngCiclista
            icon: "/img/bici_map.png"
      });
    }
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
  .map(res => res.json())
  .do(data => {
    //this.posicionCiclista = data;
    console.log(data);
  }); 
  }

onPageWillLeave(){
  clearInterval(this.timer);
}

cambiarEstadoEnvio(estado){
  
  console.log(estado);  
  this.botonstatus=true;
  var token=this.local.get('token')._result;
  var datos="id_envio="+this.envio.pk+"&estado="+estado;
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://127.0.0.1:8000/envios/cambiarEstadoEnvio/',datos,{
      headers:headers
  })
  .subscribe(success=>{
    console.log(success.json());
  }), error=>{
      console.log(error);
  }
}




}

import {Page, NavController, NavParams, Storage, LocalStorage, Alert} from 'ionic/ionic';
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
  this.timer=setTimeout(this.dibujarPosicionCilista.bind(this),700);
	this.timer=setInterval(this.dibujarPosicionCilista.bind(this), 60000);



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
            icon: "./img/bici_map.png"
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
  return this.http.post('http://p02diada.pythonanywhere.com/envios/getPosicionCiclistaPorId/',datos,{
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
  this.http.post('http://p02diada.pythonanywhere.com/envios/cambiarEstadoEnvio/',datos,{
      headers:headers
  })
  .subscribe(success=>{
    console.log(success.json());
  }), error=>{
      console.log(error);
  }

  if(estado="confirmado"){
      let alert = Alert.create({
      title: 'Valoracion',
      message: 'Inserte una valoracion del 1 al 5 para el ciclista que ha realizado su envio ',
      inputs: [
      {
        name: 'Valoracion',
        placeholder: 'Del 1 al 5',
        type: 'number',
      },
      ],
      buttons: [
      {
        text: 'Aceptar',
        handler: data=>{
          console.log(data);
          if(data.Valoracion>5 || data.Valoracion<1){
            this.cambiarEstadoEnvio('confirmado');
          }else{
            this.enviarValoracion(data);
            this.borrarAnuncio();
          }
          
        }

      },
      ]

    });
    this.nav.present(alert);

  }


}
borrarAnuncio(){

    var token=this.local.get('token')._result;
    var id_usuario=this.local.get('id_usuario')._result; 
    var headers= new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token);

    datos="id_anuncio="+this.anuncio.pk;

  this.http.post('http://p02diada.pythonanywhere.com/envios/borrarAnuncio/',datos , {
      headers: headers

    })
    .subscribe(success => {
      //console.log(anuncio);
      console.log("BIENNN");
      console.log(success);
      
    }, error => {
      //console.log(anuncio);
      console.log("MALLLLL");
      console.log(error);


  }

}

enviarValoracion(data){

    var token=this.local.get('token')._result;
    var id_usuario=this.local.get('id_usuario')._result; 
    var headers= new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token);

    datos="id_ciclista="+this.oferta.ciclista+"&valoracion="+data.Valoracion;

  this.http.post('http://p02diada.pythonanywhere.com/envios/cambiarValoracionCiclista/',datos , {
      headers: headers

    })
    .subscribe(success => {
      //console.log(anuncio);
      console.log("BIENNN");
      console.log(success);
      
    }, error => {
      //console.log(anuncio);
      console.log("MALLLLL");
      console.log(error);


  }

}






}

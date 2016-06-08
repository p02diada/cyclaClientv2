import {Page, NavController, NavParams, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the SendingDetailsCiclistaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/sending-details-ciclista/sending-details-ciclista.html',
})
export class SendingDetailsCiclistaPage {
  constructor(nav: NavController, navParams: NavParams, http:Http) {
    this.nav = nav;
	this.http=http;
	this.local=new Storage(LocalStorage);
	this.cargarDatos();
  }

  cargarDatos(){

  	var timer = setTimeout(this.cargarMapa.bind(this),500);


  	this.obtenerDatos().subscribe(
  		(datos)=>{
  			console.log(datos);
  			this.anuncio=datos.anuncio;
  			this.envio=datos.envio;
  			this.oferta=datos.oferta;

  		});


  }

  obtenerDatos(){
  	var token=this.local.get('token')._result;
  	var id_usuario=this.local.get('id_usuario')._result;
  	var datos="id_usuario="+id_usuario;
  	var headers= new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token);

   	return this.http.post('http://127.0.0.1:8000/envios/getEnviosCiclista/',datos,{
    	headers:headers
  	})
  	.map(res=>res.json())
  	.do(data=>{
  		console.log(data);
  	});
  }

  cargarMapa(){

    var latlng = new google.maps.LatLng(37.8881751, -4.7793835);
    var mapOptions = {
      zoom: 15,
      center: latlng
    }

    map = new google.maps.Map(document.getElementById("map1"), mapOptions);
    //console.log(anuncio.latitudPuntoInicial);
    var latlngInicial = new google.maps.LatLng(this.anuncio.latitudPuntoInicial, this.anuncio.longitudPuntoInicial);
    var latlngFinal = new google.maps.LatLng(this.anuncio.latitudPuntoFinal, this.anuncio.longitudPuntoFinal);
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
	
  }

  cambiarEstadoEnvio(estado){

    this.statusBoton=true;
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

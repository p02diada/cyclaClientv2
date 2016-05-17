import {Page, NavController, NavParams, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';

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
		this.local=new Storage(LocalStorage);
		this.cargarMapa();
	}

	cargarMapa(){
		
		this.anuncio=this.getAnuncio(this.envio.anuncio);
		console.log(this.anuncio);
		//console.log(anuncio);
		//this.getOferta(this.envio.oferta);
		//console.log(this.oferta)
	}

	getAnuncio(id_anuncio){
		console.log(id_anuncio)
		var token=this.local.get('token')._result; 
		var headers= new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Authorization', 'Token '+token);
		datos="id_anuncio="+id_anuncio;
		this.http.post('http://127.0.0.1:8000/envios/getAnuncioPorId/',datos , {
			headers: headers

		})

		.subscribe(success => {
			this.anuncio=success.json();
			console.log("BIENNN");
			console.log(success);
			console.log(this.anuncio);
			return this.anuncio;
			
			

		}, error => {

  			console.log("MALLLLL");
  			console.log(error);
		}

	}

	getOferta(id_oferta){
		console.log(id_oferta)
		var token=this.local.get('token')._result; 
		var headers= new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Authorization', 'Token '+token);
		datos="id_oferta="+id_oferta;
		this.http.post('http://127.0.0.1:8000/envios/getOfertaPorId/',datos , {
			headers: headers

		})
		.subscribe(success => {
			this.oferta=success.json();
			console.log("BIENNN");
			console.log(success);
			

		}, error => {

  			console.log("MALLLLL");
  			console.log(error);
		}

	}

}

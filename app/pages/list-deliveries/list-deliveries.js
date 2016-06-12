import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import {NewBidPage} from '../new-bid/new-bid';

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
    this.getPosition();
    //this.cargarLista();


  }

  getPosition(){

	navigator.geolocation.getCurrentPosition(
		(position)=>{
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
			this.cargarLista(position.coords.latitude,position.coords.longitude);
		},
		(error)=>{
			console.log(error);
		}
	);
   

  }

  cargarLista(latitude,longitude){

  datos="latitude="+latitude+"&longitude="+longitude;
  console.log(datos)
  var token=this.local.get('token')._result; 
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://localhost:8000/envios/getAnuncios/',datos,{
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

  ofertar(anuncio){
    console.log(anuncio);
    this.nav.push(NewBidPage,{
      anuncio:anuncio,
    });
  }

}

import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
/*
  Generated class for the SendingListRemitentePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/sending-list-remitente/sending-list-remitente.html',
})
export class SendingListRemitentePage {
  constructor(nav: NavController, http:Http) {
    this.nav = nav;
    this.http=http;
    this.local=new Storage(LocalStorage);
    this.cargarListaEnviosRemitente();
  }

  cargarListaEnviosRemitente(){
  var token=this.local.get('token')._result;
  var id_usuario=this.local.get('id_usuario')._result;
  var datos="id_usuario="+id_usuario;
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  this.http.post('http://127.0.0.1:8000/envios/getEnviosRemitente/',datos,{
  	headers:headers
  })
  .subscribe(success =>{
  	console.log(success);
  	this.lista=success.json();
  	this.listaEnvios=this.lista.listaEnvios;
  	listaAnuncios=this.lista.listaAnuncios;
    for(i=0;i<this.listaEnvios.length;i++)
    {
      this.listaEnvios[i].descripcion=listaAnuncios[i].descripcion;
    }

    console.log(this.listaEnvios);
    console.log(listaAnuncios);


  }), error => {
  	console.log(error);
  }
  }


}

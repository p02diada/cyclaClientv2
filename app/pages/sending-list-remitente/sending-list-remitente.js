import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import {SendingDetailsPage} from '../sending-details/sending-details';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
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
  this.http.post('http://localhost:8000/envios/getEnviosRemitente/',datos,{
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

  verDetallesEnvio(envio){
    this.envio=envio;
    this.getAnuncio(envio.anuncio).subscribe(
    (anuncio) => {
      this.anuncio=anuncio;
      });
    this.getOferta(envio.oferta).subscribe(
      (oferta)=>{
        this.oferta=oferta;
        //this.obtenerPosicionCiclista();

      });
    var timer= setTimeout(this.enviarDatosADetalle.bind(this),200);
  }

enviarDatosADetalle(){
    this.nav.push(SendingDetailsPage,{
      envio:this.envio,
      anuncio:this.anuncio.anuncio,
      oferta:this.oferta.oferta,
    });

}

getAnuncio(id_anuncio){
  if (this.anuncio){
    return Observable.of(this.anuncio);
  } else {
  var token=this.local.get('token')._result; 
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  datos="id_anuncio="+id_anuncio;
  return this.http.post('http://localhost:8000/envios/getAnuncioPorId/',datos , {
    headers: headers

  })
  .map(res => res.json())
  .do(data => {
    this.anuncio = data;
  });
    
}
}


getOferta(id_oferta){
  if (this.id_oferta){
    return Observable.of(this.oferta);
  } else {
  var token=this.local.get('token')._result; 
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  datos="id_oferta="+id_oferta;
  return this.http.post('http://localhost:8000/envios/getOfertaPorId/',datos , {
    headers: headers

  })
  .map(res => res.json())
  .do(data => {
    this.oferta = data;
  });
    
}
}

obtenerPosicionCiclista(){

}


}

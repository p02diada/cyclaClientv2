import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the NewDeliveryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/new-delivery/new-delivery.html',
})
export class NewDeliveryPage {

	anuncioForm: ControlGroup;
    descripcion: AbstractControl;

  constructor(nav: NavController, form: FormBuilder,http:Http) {
    this.nav = nav;
    this.http=http;
    this.anuncioForm=form.group({
    	descripcion: ['', Validators.compose([Validators.required])],
      direccionInicial: ['', Validators.compose([Validators.required])],
      direccionFinal: ['', Validators.compose([Validators.required])],
    })
    this.cargarMapa();
    this.local=new Storage(LocalStorage);
    //console.log(this.local.get('username'));

  }

cargarMapa(){

    var onSuccess = function(position) {
    var latitude=position.coords.latitude;

    var longitude=position.coords.longitude;

    var latlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 15,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);



  };
  var onError= function (error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError); 

}




registro(){
	var datos=this.anuncioForm.value;
  var id_usuario=this.local.get('id_usuario')._result;  
	console.log(datos.descripcion);
  console.log(datos.direccionInicial);
  console.log(datos.direccionFinal);

    geocoder = new google.maps.Geocoder();


    var addressInicial=datos.direccionInicial;
    var addressFinal=datos.direccionFinal;

    geocoder.geocode( { 'address': addressInicial}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });


      var latitudPuntoInicial=results[0].geometry.location.lat();
      //anuncio["latitudPuntoInicial"]=latitudPuntoInicial;


      var longitudPuntoInicial=results[0].geometry.location.lng();
     // anuncio["longitudPuntoInicial"]=longitudPuntoInicial;

    geocoder.geocode( { 'address': addressFinal}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      var latitudPuntoFinal=results[0].geometry.location.lat();
      //anuncio["latitudPuntoFinal"]=latitudPuntoFinal;


      var longitudPuntoFinal=results[0].geometry.location.lng();
      datos="remitente="+id_usuario+"&descripcion="+datos.descripcion+"&latitudPuntoInicial="+latitudPuntoInicial+"&longitudPuntoInicial="+longitudPuntoInicial+"&latitudPuntoFinal="+latitudPuntoFinal+"&longitudPuntoFinal="+longitudPuntoFinal;
      //anuncio["longitudPuntoFinal"]=longitudPuntoFinal;
        //console.log(results[0].geometry.location);
        //console.log(results[0].geometry.location.lat());
        

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });



      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });



  setTimeout(()=>{
    this.enviarDatosAnuncio(datos);

  }, 500);

  

}

enviarDatosAnuncio(datos){
  console.log("Enviando datos");
  console.log(datos);
  var token=this.local.get('token')._result; 
  var headers= new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Token '+token);
  //headers.append('Access-Control-Allow-Origin','*');
  //headers.append('Access-Control-Allow-Headers','Content-Type');



  this.http.post('http://127.0.0.1:8000/envios/crearAnuncio/',datos , {
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

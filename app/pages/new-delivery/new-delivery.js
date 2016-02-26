import {Page, NavController, Storage, LocalStorage} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http} from 'angular2/http';

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
      anuncio["latitudPuntoInicial"]=latitudPuntoInicial;


      var longitudPuntoInicial=results[0].geometry.location.lng();
      anuncio["longitudPuntoInicial"]=longitudPuntoInicial;


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    geocoder.geocode( { 'address': addressFinal}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      var latitudPuntoFinal=results[0].geometry.location.lat();
      anuncio["latitudPuntoFinal"]=latitudPuntoFinal;


      var longitudPuntoFinal=results[0].geometry.location.lng();
      anuncio["longitudPuntoFinal"]=longitudPuntoFinal;
        //console.log(results[0].geometry.location);
        //console.log(results[0].geometry.location.lat());
        

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    var username=this.local.get('username')._result;
    var anuncio={
      "remitente": username,
      "descripcion": datos.descripcion,
    };

  console.log(anuncio);
  var prueba = {
    "remitente": "111",
    "descripcion": "la que sea",
    "latitudPuntoInicial": 40.4167754,
    "longitudPuntoInicial": -3.7037901999999576,
    "latitudPuntoFinal": 40.4167754,
    "longitudPuntoFinal": -3.7037901999999576,


  }
  datos="remitente="+"2"+"&descripcion="+"la que sea"+"&latitudPuntoInicial="+"40.4167754"+"&longitudPuntoInicial="+"-3.7037901999999576"+"&latitudPuntoFinal="+"40.4167754"+"&longitudPuntoFinal="+"-3.7037901999999576";
  this.http.post('http://127.0.0.1:8000/envios/crearAnuncio/',datos , {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + 'e31e642fa2aa05743309a9a4deef815302c6c287',
      }

    })
    .subscribe(success => {
      console.log(anuncio);
      console.log("BIENNN");
      console.log(success);
    }, error => {
      console.log(anuncio);
      console.log("MALLLLL");
      console.log(error);


}



}

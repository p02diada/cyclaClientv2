import {Page, NavController, Storage,Alert, LocalStorage} from 'ionic/ionic';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {ListOwnDeliveriesPage} from '../list-own-deliveries/list-own-deliveries';
import {Toast} from 'ionic-native';
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
      datosAdicionalesDireccionRemitente: ['', Validators.compose([Validators.required])],
      datosAdicionalesDireccionReceptor: ['', Validators.compose([Validators.required])],
      direccionFinal: ['', Validators.compose([Validators.required])],
      telefonoRemitente: ['', Validators.compose([Validators.required])],
      telefonoReceptor: ['', Validators.compose([Validators.required])],
      nombreRemitente: ['', Validators.compose([Validators.required])],
      nombreReceptor: ['', Validators.compose([Validators.required])],
    })
    //this.cargarMapa();
    //this.presentAlert();
    this.local=new Storage(LocalStorage);
    //console.log(this.local.get('username'));

  }

/*cargarMapa(){

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

}*/

presentAlert() {
  let alert = Alert.create({
    title: 'Error',
    subTitle: 'las direcciones deben tener la forma: Calle, número, localidad',
    buttons: ['Aceptar']
  });
  this.nav.present(alert);
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
        /*
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });*/


      latitudPuntoInicial=results[0].geometry.location.lat();
      //anuncio["latitudPuntoInicial"]=latitudPuntoInicial;


      longitudPuntoInicial=results[0].geometry.location.lng();
     // anuncio["longitudPuntoInicial"]=longitudPuntoInicial;

    geocoder.geocode( { 'address': addressFinal}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
       /* map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });*/
      latitudPuntoFinal=results[0].geometry.location.lat();
      //anuncio["latitudPuntoFinal"]=latitudPuntoFinal;


      longitudPuntoFinal=results[0].geometry.location.lng();
      datos="remitente="+id_usuario+"&descripcion="+datos.descripcion+'&telefonoRemitente='+datos.telefonoRemitente+'&telefonoReceptor='+datos.telefonoReceptor+'&nombreRemitente='+datos.nombreRemitente+'&nombreReceptor='+datos.nombreReceptor+'&direccionRemitente='+datos.direccionInicial+'&datosAdicionalesDireccionReceptor='+datos.datosAdicionalesDireccionReceptor+'&datosAdicionalesDireccionRemitente='+datos.datosAdicionalesDireccionRemitente+'&direccionReceptor='+datos.direccionFinal+"&latitudPuntoInicial="+latitudPuntoInicial+"&longitudPuntoInicial="+longitudPuntoInicial+"&latitudPuntoFinal="+latitudPuntoFinal+"&longitudPuntoFinal="+longitudPuntoFinal;

        

      } else {
        console.log('Error, las direcciones deben tener la forma: Calle, número, localidad');
        //alert('Error, las direcciones deben tener la forma: Calle, número, localidad');
      }
    });



      } else {
        console.log('Error, las direcciones deben tener la forma: Calle, número, localidad');
      }
    });



  setTimeout(()=>{
    if(typeof latitudPuntoFinal != 'undefined' && typeof latitudPuntoInicial != 'undefined' &&  typeof longitudPuntoInicial != 'undefined' &&  typeof longitudPuntoFinal != 'undefined'){
      console.log(latitudPuntoFinal);
      console.log(latitudPuntoInicial);
      console.log(longitudPuntoFinal);
      console.log(longitudPuntoInicial);

      this.enviarDatosAnuncio(datos);

    }else{
      this.presentAlert();
    }
    

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



  this.http.post('http://p02diada.pythonanywhere.com/envios/crearAnuncio/',datos , {
      headers: headers

    })
    .subscribe(success => {
      //console.log(anuncio);
      console.log("BIENNN");
      console.log(success);
      Toast.show("Anuncio creado correctamente", 5000, "top").subscribe(
        toast => {
        console.log(toast);
      });
      this.nav.setRoot(ListOwnDeliveriesPage);
      
    }, error => {
      //console.log(anuncio);
      console.log("MALLLLL");
      console.log(error);


}


}

}

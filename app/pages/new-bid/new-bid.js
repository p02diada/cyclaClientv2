import {Page, Alert, NavController, NavParams,Storage, LocalStorage} from 'ionic/ionic';
import {Http, Headers} from 'angular2/http';
import {ListDeliveriesPage} from '../list-deliveries/list-deliveries';
//import {Toast} from 'ionic-native';


/*
  Generated class for the NewBidPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/new-bid/new-bid.html',
})
export class NewBidPage {
  constructor(nav: NavController,navParams: NavParams, http:Http  ) {
    this.nav = nav;
  	this.navParams=navParams;
  	this.http=http;
  	this.anuncio=navParams.get("anuncio");
  	this.local=new Storage(LocalStorage);
  	console.log(this.anuncio);
  	this.cargarElMapa();
  }

  cargarElMapa(){

/*Toast.show("I'm a toast", 5000, "center").subscribe(
  toast => {
    console.log(toast);
  }
);*/

    /*window.plugins.toast.showWithOptions(
    {
      message: "hey there",
      duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    }*/



    console.log(this.anuncio.latitudPuntoInicial);
    anuncio=this.anuncio

    setTimeout(function(){

    var latlng = new google.maps.LatLng(37.8881751, -4.7793835);
    var mapOptions = {
      zoom: 12,
      center: latlng
    }

    map = new google.maps.Map(document.getElementById("map1"), mapOptions);
    console.log(anuncio.latitudPuntoInicial);
    var latlngInicial = new google.maps.LatLng(anuncio.latitudPuntoInicial, anuncio.longitudPuntoInicial);
    var latlngFinal = new google.maps.LatLng(anuncio.latitudPuntoFinal, anuncio.longitudPuntoFinal);


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

    var onSuccess = function(position) {
    var latitude=position.coords.latitude;

    var longitude=position.coords.longitude;

    var latlngActual = new google.maps.LatLng(latitude, longitude);


    var markerFinal = new google.maps.Marker({
            map: map,
         	animation: google.maps.Animation.BOUNCE,
            position: latlngActual
            icon: "/img/bici_map.png"
    });




  };
  var onError= function (error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError); 

    	

    }, 500, anuncio)


    
    
  }


  getPrecio(){
  	let alert = Alert.create({
  		title: 'Precio',
  		message: 'Inserte el precio por el que esta dispuesto a realizar este envío',
  		inputs: [
  		{
  			name: 'Precio',
  			placeholder: '€',
        type: 'number'
  		},
  		],
  		buttons: [
  		{
  			text: 'Cancelar',
  			handler: data => {
  				console.log('Cancelado');
  			}
  		},
  		{
  			text: 'Aceptar',
  			handler: data=>{
  				console.log(data);
  				this.guardarPrecio(data);
          alert('Oferta creada correctamente')
  			}

  		}
  		]

  	});
  	this.nav.present(alert);

  }

  guardarPrecio(data){
  	console.log('GUARDADOOO');
    var token=this.local.get('token')._result;
    var id_usuario=this.local.get('id_usuario')._result; 
    var headers= new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token);

    datos="anuncio="+this.anuncio.pk+"&ciclista="+id_usuario+"&precio="+data.Precio

  this.http.post('http://localhost:8000/envios/crearOferta/',datos , {
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

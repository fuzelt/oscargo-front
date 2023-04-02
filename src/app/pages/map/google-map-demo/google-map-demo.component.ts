import { HttpClient } from '@angular/common/http';
import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';


export interface Marker {
  options: google.maps.MarkerOptions,
  markerPosition: google.maps.LatLngLiteral
}
export interface Position {
  color: string,
  icon: string,
  id: number,
  lat: number,
  lng: number,
  patent: string,
  capacity: number,
  loaded: number,
  phone: string,
  name: string,
  infoWindow?: string,
  marker?: Marker
}
@Component({
  selector: 'app-google-map-demo',
  templateUrl: './google-map-demo.component.html',
  styleUrls: ['./google-map-demo.component.scss']
})


export class GoogleMapDemoComponent implements OnInit {

  @ViewChild(GoogleMap) public gmap!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  zoomMap = 7;
  options: google.maps.MapOptions = {};
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral;
  showSpinner: boolean = false;
  markerOptions: google.maps.MarkerOptions = { draggable: false, icon: 'assets/images/marcador-epec-verde.png', clickable: true, };
  positions: Position[] = [];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN4CLBzIRPZZ26DBGIISei4OsZiSpmCo', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  logCenter() {
    console.log(JSON.stringify(this.gmap.getCenter()))
  }

  ngOnInit(): void {
    this.center = { lat: -38.73742590048079, lng: -62.24795908339144 };
    this.showSpinner = true;
    this.getPositions();
  }

  getPositions() {

    let position: Position = {
      color: 'red',
      icon: 'truck',
      id: 1,
      lat: -38.75421086939975,
      lng: -62.26506815533449,
      patent: 'AB123CD',
      capacity: 10000,
      loaded: 1000,
      phone: '2916481551',
      name: 'Juan López'
    }

    let markerOptions: google.maps.MarkerOptions = Object.assign({}, this.markerOptions);
    markerOptions.icon = 'assets/images/' + position.icon + '-' + position.color + '.png';
    position.marker = ({ markerPosition: { lat: -38.754113684946326, lng: -62.26513280517563 }, options: markerOptions });

      let infoWindow = '<div class="info">' +
        '<h2>' + position.patent + '</h2>' +
        '<div class="contenidoInfo">' +
        '<p>Capacidad: ' + position.capacity + '<br>' +
        '<p>Cargado: ' + position.loaded + '<br>' +
        '<p>Nombre: ' + position.name + '<br>' +
        '<p>Teléfono: ' + position.phone + '<br>' +
        '<p><a href="' + position.phone + '" target="blank">Llamar</a></p>' +        
        '</div>' +
        '<input id="markerId" type="hidden" value="' + position.id + '"/>' +
        '</div>';
        position.infoWindow = infoWindow;

        this.positions.push(position);

        let position2: Position = {
          color: 'green',
          icon: 'truck',
          id: 1,
          lat: -36.937212562735255,
          lng: -60.32535166151644,
          patent: 'ZB444CD',
          capacity: 9000,
          loaded: 0,
          phone: '2916481551',
          name: 'José Pérez'
        }
    
        let markerOptions2: google.maps.MarkerOptions = Object.assign({}, this.markerOptions);
        markerOptions2.icon = 'assets/images/' + position2.icon + '-' + position2.color + '.png';
        position2.marker = ({ markerPosition: { lat: position2.lat, lng: position2.lng }, options: markerOptions2 });
    
         let infoWindow2 = '<div class="info">' +
            '<h2>' + position2.patent + '</h2>' +
            '<div class="contenidoInfo">' +
            '<p>Capacidad: ' + position2.capacity + '<br>' +
            '<p>Cargado: ' + position2.loaded + '<br>' +
            '<p>Nombre: ' + position2.name + '<br>' +
            '<p>Teléfono: ' + position2.phone + '<br>' +
            '<p><a href="' + position2.phone + '" target="blank">Llamar</a></p>' +        
            '</div>' +
            '<input id="markerId" type="hidden" value="' + position2.id + '"/>' +
            '</div>';
            position2.infoWindow = infoWindow2;
    
            this.positions.push(position2);
            console.log('this.positions',this.positions)
    
  }


  openInfoWindow(marker: MapMarker, reclamo) {
    this.infoWindow.infoWindow.setContent(reclamo.infoWindow);
    this.infoWindow.open(marker);
    this.infoWindow.domready.subscribe(
      (boton) => {
        var markerId = document.getElementById('markerId').getAttribute('value');
      });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    console.log('event.latLng.toJSON()', event.latLng.toJSON());
    console.log('getCenter', JSON.stringify(this.gmap.getCenter()))
  }

  zoomChanged(gmap: any) {
    this.zoomMap = gmap.getZoom();
    console.log('this.zoomMap', this.zoomMap);
  }
}

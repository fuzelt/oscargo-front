import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import FirestorePosition from 'src/app/interfaces/position.interface';

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
  positions: FirestorePosition[] = [];

  constructor(httpClient: HttpClient,
    private placesService: FirebaseServiceService) {
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

  async onClickDelete(place: any) {
    //const response = await this.placesService.deletePlace(place);
    console.log(place);
  }

  setPositionsList(positions) {
    console.log('positions', positions)
    positions.forEach(position => {

      let markerOptions: google.maps.MarkerOptions = Object.assign({}, this.markerOptions);
      markerOptions.icon = 'assets/images/' + position.icon + '-' + position.color + '.png';
      position.marker = ({ markerPosition: { lat: position.lat, lng: position.lng }, options: markerOptions });

      let infoWindow = '<div class="info">' +
        '<h2>' + position.patent + '</h2>' +
        '<div class="contenidoInfo">' +
        '<p>Fecha: ' + position.timestamp + '<br>' +
        '<p>Capacidad: ' + position.capacity + '<br>' +
        '<p>Cargado: ' + position.loaded + '<br>' +
        '<p>Nombre: ' + position.name + '<br>' +
        '<p>Teléfono: ' + position.phone + '<br>' +
        '<p><a href="' + position.phone + '" target="blank">Llamar</a></p>' +
        '</div>' +
        '<input id="markerId" type="hidden" value="' + position.id + '"/>' +
        '</div>';
      position.infoWindow = infoWindow;
    });
    this.positions = positions;
  }

  getPositions() {
    this.placesService.getPlaces().subscribe(positions => {
      this.setPositionsList(positions);
    }, error => {
      console.log('error', error);
    })
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

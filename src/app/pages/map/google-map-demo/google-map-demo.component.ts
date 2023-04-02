import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-map-demo',
  templateUrl: './google-map-demo.component.html',
  styleUrls: ['./google-map-demo.component.scss']
})
export class GoogleMapDemoComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBMN4CLBzIRPZZ26DBGIISei4OsZiSpmCo', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  ngOnInit(): void {
  }

}

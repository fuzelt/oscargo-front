import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapDemoComponent } from './google-map-demo.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component:  GoogleMapDemoComponent
  }
]

@NgModule({
  declarations: [
    GoogleMapDemoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ]
})
export class GoogleMapDemoModule { }

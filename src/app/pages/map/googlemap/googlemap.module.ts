import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapComponent } from './googlemap.component';

const routes: Routes = [
  {
    path: '',
    component:  GooglemapComponent
  }
]

@NgModule({
  declarations: [GooglemapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class GooglemapModule { }

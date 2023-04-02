import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'map/googlemap',
    loadChildren: () => import('./pages/map/googlemap/googlemap.module')
      .then(m => m.GooglemapModule)
  },
  {
    path: 'map/googlemap/google-map-demo',
    loadChildren: () => import('./pages/map/google-map-demo/google-map-demo.module')
      .then(m => m.GoogleMapDemoModule)
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./rates/rates.module').then(m => m.RatesModule)
}, {
  path: 'historical',
  loadChildren: () => import('./historical/historical.module').then(m => m.HistoricalModule)
}, {
  path: 'difference',
  loadChildren: () => import('./difference/difference.module').then(m => m.DifferenceModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

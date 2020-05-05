import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/rates/rates.module').then(m => m.RatesModule)
}, {
  path: 'historical',
  loadChildren: () => import('./pages/historical/historical.module').then(m => m.HistoricalModule)
}, {
  path: 'top',
  loadChildren: () => import('./pages/difference/difference.module').then(m => m.DifferenceModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

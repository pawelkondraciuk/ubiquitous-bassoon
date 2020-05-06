import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './pages/root/root.component';

const routes: Routes = [{
  path: ':currency',
  component: RootComponent,
  children: [{
    path: '',
    loadChildren: () => import('./pages/rates/rates.module').then(m => m.RatesModule)
  }, {
    path: 'historical',
    loadChildren: () => import('./pages/historical/historical.module').then(m => m.HistoricalModule)
  }, {
    path: 'top',
    loadChildren: () => import('./pages/difference/difference.module').then(m => m.DifferenceModule)
  }],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'EUR'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

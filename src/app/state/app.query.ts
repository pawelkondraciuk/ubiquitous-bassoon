import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppStore, AppState } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

  loading$ = this.selectLoading();
  baseCurrency$ = this.select(state => state.ui.baseCurrency);
  currencies$ = this.select('currencies');

  constructor(protected store: AppStore) {
    super(store);
  }

}

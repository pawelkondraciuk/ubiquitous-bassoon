import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppStore, AppState, RatesState } from './app.store';
import { map, withLatestFrom } from 'rxjs/operators';

export interface Rates {
  [key: string]: number;
}

export interface LatestRates {
  today: Rates;
  yesterday: Rates;
}

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

  loading$ = this.selectLoading();
  baseCurrency$ = this.select('baseCurrency');
  rates$ = this.select('rates');
  latest$ = this.rates$.pipe(map<RatesState, LatestRates>((rates: RatesState) => {
    const ratesKeys = Object.keys(rates);
    if (ratesKeys.length === 0) {
      return {
        today: {},
        yesterday: {},
      } as LatestRates;
    }
    const [todayDate, yesterdayDate] = ratesKeys.reverse();

    return {
      today: rates[todayDate],
      yesterday: rates[yesterdayDate],
    } as LatestRates;
  }));
  currencies$ = this.baseCurrency$.pipe(
    withLatestFrom(this.latest$),
    map(([baseCurrency, { today }]) => {
      const currencies = [
        ...Object.keys(today),
        baseCurrency,
      ]
  
      return currencies.sort();
    })
  );

  constructor(protected store: AppStore) {
    super(store);
  }
}

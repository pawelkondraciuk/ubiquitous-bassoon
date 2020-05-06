import { Injectable } from '@angular/core';
import { AppQuery } from '@state/app.query';
import { map, withLatestFrom } from 'rxjs/operators';
import { RouterQuery } from '@datorama/akita-ng-router-store';

@Injectable({
  providedIn: 'root',
})
export class HistoricalQuery {
  currency$ = this.routerQuery.selectParams('currency');
  chartData$ = this.appQuery.rates$.pipe(
    withLatestFrom(this.currency$),
    map(([rates, currency]) => {
      const value = [];
      for (let date in rates) {
        const ratesByDay = rates[date];
        const currencyRate = ratesByDay[currency] || 1;
        value.push({
          name: date,
          value: currencyRate,
        });
      }
      return value;
    })
  );
  constructor(private appQuery: AppQuery, private routerQuery: RouterQuery) {}
}

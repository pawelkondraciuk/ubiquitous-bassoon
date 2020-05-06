import { Injectable } from '@angular/core';
import { AppQuery } from '@state/app.query';
import { map } from 'rxjs/operators';

export interface LatestQuery {
  currency: string;
  difference: number;
  percentage: number;
}

@Injectable({ providedIn: 'root' })
export class DifferenceQuery {
  latest$ = this.appQuery.latest$.pipe(
    map(({ today, yesterday }) => {
      const currencies = Object.keys(today);
      return currencies.map(currency => {
        const difference = today[currency] - yesterday[currency];
        const percentage = difference / today[currency];
        return {
          currency,
          difference,
          percentage,
        }
      })
    })
  )
  constructor(private appQuery: AppQuery) {}
}

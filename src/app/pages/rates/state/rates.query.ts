import { Injectable } from '@angular/core';
import { AppQuery } from '@state/app.query';
import { map } from 'rxjs/operators';

function calcDiff(a: number, b: number) {
  if (a > b) {
    return -1;
  } else if (b > a) {
    return 1;
  }
  return 0;
}

@Injectable({ providedIn: 'root' })
export class RatesQuery {
  latest$ = this.appQuery.latest$.pipe(
    map(({ today, yesterday }) => {
      const currencies = Object.keys(today);
      return currencies.map((currency) => ({
        currency,
        spot: today[currency],
        difference: calcDiff(today[currency], yesterday[currency]),
      }));
    })
  );
  constructor(private appQuery: AppQuery) {}
}

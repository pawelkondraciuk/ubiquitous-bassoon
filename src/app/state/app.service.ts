import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { subDays, format, subMonths } from 'date-fns';
import { AppStore, AppState } from './app.store';
import { tap, catchError } from 'rxjs/operators';
import { ENDPOINT_URL } from '../endpoint-url.token';
import { AppQuery } from './app.query';

interface HistoricalResponseBody {
  rates: {
    [key: string]: {
      [key in string]: number;
    }
  },
  base: string,
  start_at: string,
  end_at: string,
}

const dateFormat = 'yyyy-MM-dd';

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(
    @Inject(ENDPOINT_URL) private endpointUrl: string,
    private appStore: AppStore,
    private appQuery: AppQuery,
    private http: HttpClient) {
  }

  getLatest(baseCurrency?: string) {
    this.appStore.setLoading(true);
    const today = new Date();
    const monthAgo = subMonths(today, 1);
    return this.http.get<HistoricalResponseBody>(`${this.endpointUrl}/history`, {
      params: {
        ...(baseCurrency ? { base: baseCurrency } : {}),
        start_at: format(monthAgo, dateFormat),
        end_at: format(today, dateFormat),
      }
    })
    .pipe(
      tap(({ base, rates }: HistoricalResponseBody) => {
        this.appStore.update({
          baseCurrency: base,
          rates: AppService.sortRates(rates)
        })
      }),
      tap(() => this.appStore.setLoading(false)),
      catchError(err => {
        this.appStore.setError({ message: 'Unable to get data' });
        throw err;
      })
    );
  }

  private static sortRates<T>(obj: T) {
    return Object.keys(obj).sort().reduce((cur, prev) => (cur[prev] = obj[prev], cur), {});
  }
}

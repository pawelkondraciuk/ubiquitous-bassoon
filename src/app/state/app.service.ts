import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { subDays, format } from 'date-fns';
import { AppStore } from './app.store';
// import { App } from './app.model';
import { tap, take, switchMap } from 'rxjs/operators';
import { ENDPOINT_URL } from '../endpoint-url.token';
import { AppQuery } from './app.query';

const dateFormat = 'yyyy-MM-dd';

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

interface LatestResponseBody {
  rates: {
    [key in string]: number;
  },
  base: string,
  date: string,
}

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(
    @Inject(ENDPOINT_URL) private endpointUrl: string,
    private appStore: AppStore,
    private appQuery: AppQuery,
    private http: HttpClient) {
  }

  getInitialData() {
    this.appStore.setLoading(true);
    return this.http.get<LatestResponseBody>(`${this.endpointUrl}/latest`)
      .pipe(
        tap((data) => {
          this.appStore.update({
            currencies: [
              ...Object.keys(data.rates),
              data.base
            ].sort(),
            latestDate: data.date,
            ui: {
              baseCurrency: data.base,
            }
          });
          this.appStore.setLoading(false);
        })
      );
  }

  getLatest() {
    return this.appQuery.baseCurrency$.pipe(
      take(1),
      switchMap((baseCurrency: string) => {
        return this.http.get<LatestResponseBody>(`${this.endpointUrl}/latest`, {
          params: {
            base: baseCurrency,
          }
        });
      })
    )
  }

  getByDay(date: Date) {
    const formattedDate = format(date, dateFormat); 
    return this.http.get<HistoricalResponseBody>(`${this.endpointUrl}/${formattedDate}`);
  }

  private getHistory(startDate: Date, endDate: Date) {
    
    return this.http.get<HistoricalResponseBody>(`${this.endpointUrl}/history`, {
      params: {
        start_at: format(startDate, dateFormat),
        end_at: format(endDate, dateFormat),
      }
    });
  }
}

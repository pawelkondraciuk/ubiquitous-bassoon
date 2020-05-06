import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface RatesState {

}

export interface AppState {
  ui: {
    baseCurrency: string;
  },
  currencies: string[],
  latestDate: string,
}

export function createInitialState(): AppState {
  return {
    ui: { baseCurrency: null },
    latestDate: null,
    currencies: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'root' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}


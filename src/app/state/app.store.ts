import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

const EMPTY_CURRENCY = 'EMPTY';

export interface RatesState {
  [key: string]: {
    [key in string]: number;
  }
}

export interface AppState {
  baseCurrency: string;
  rates: RatesState;
}

export function createInitialState(): AppState {
  return {
    baseCurrency: EMPTY_CURRENCY,
    rates: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'root' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}


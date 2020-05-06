import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppQuery } from '@state/app.query';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

function calcDiff(a: number, b: number) {
  if (a > b) {
    return -1;
  } else if (b > a) {
      return 1;
  }
  return 0;
}

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  loading$ = this.appQuery.loading$;
  dataSource = new MatTableDataSource();
  displayedColumns = ['currency', 'spot', 'difference', 'chart'];

  private subscriptionDestroyer = new Subject();

  constructor(
    private appQuery: AppQuery,
  ) { }

  ngAfterViewInit() {
    this.appQuery.latest$
    .pipe(map(({ today, yesterday }) => {
      const currencies = Object.keys(today);
      return currencies.map(currency => ({
        currency,
        spot: today[currency],
        difference: calcDiff(today[currency], yesterday[currency])
      }))
    }))
    .subscribe(data => {
      this.dataSource.data = data;
    })
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.appQuery.baseCurrency$
    //   .pipe(
    //     takeUntil(this.subscriptionDestroyer),
    //     distinctUntilChanged(),
    //     switchMap(() => this.ratesService.getLatest())
    //   )
    //   .subscribe()
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AppQuery } from '@state/app.query';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RatesQuery } from './state/rates.query';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  loading$ = this.appQuery.loading$;
  dataSource = new MatTableDataSource();
  displayedColumns = ['currency', 'spot', 'difference', 'chart'];

  private subscriptionDestroyer = new Subject();

  constructor(private appQuery: AppQuery, private ratesQuery: RatesQuery) {}

  ngOnInit(): void {
    this.ratesQuery.latest$
      .pipe(
        takeUntil(this.subscriptionDestroyer),
        tap((data) => {
          this.dataSource.data = data;
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }
}

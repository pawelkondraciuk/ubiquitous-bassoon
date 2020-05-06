import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AppQuery } from '@state/app.query';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import {
  takeUntil,
  tap,
  map,
  startWith,
  switchMap,
  filter,
} from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { DifferenceQuery, LatestQuery } from './state/difference.query';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.component.html',
  styleUrls: ['./difference.component.scss'],
})
export class DifferenceComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  loading$ = this.appQuery.loading$;
  data: Observable<LatestQuery[]>;
  displayedColumns = ['currency', 'difference', 'percentage'];

  private subscriptionDestroyer = new Subject();
  private dataSubject = new BehaviorSubject<LatestQuery[]>([]);

  constructor(
    private appQuery: AppQuery,
    private differenceQuery: DifferenceQuery
  ) {
    this.data = this.dataSubject.asObservable();
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(
        takeUntil(this.subscriptionDestroyer),
        startWith({}),
        switchMap(() => this.differenceQuery.latest$),
        map((values) => orderBy(values, this.sort.active, this.sortDirection)),
        map((values) => slice(values, 0, 5)),
        tap((data) => this.dataSubject.next(data))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  private get sortDirection() {
    return this.sort.direction as 'asc' | 'desc';
  }
}

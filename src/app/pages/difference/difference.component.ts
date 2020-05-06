import {
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AppQuery } from '@state/app.query';
import { Subject, Observable } from 'rxjs';
import {
  takeUntil,
  tap,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { DifferenceQuery, LatestQuery } from './state/difference.query';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';

interface SortEvent {
  direction: 'asc' | 'desc';
  field: string;
}

@Component({
  selector: 'app-difference',
  templateUrl: './difference.component.html',
  styleUrls: ['./difference.component.scss'],
})
export class DifferenceComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  loading$ = this.appQuery.loading$;
  data$: Observable<LatestQuery[]>;
  displayedColumns = ['currency', 'difference', 'percentage'];

  private subscriptionDestroyer = new Subject();
  private sortSubject = new Subject<SortEvent>();

  constructor(
    private appQuery: AppQuery,
    private differenceQuery: DifferenceQuery
  ) {
    this.data$ = this.sortSubject.pipe(
      startWith({
        direction: 'asc',
        field: 'percentage',
      } as SortEvent),
      switchMap(({ direction, field }) =>
        this.differenceQuery.latest$.pipe(
          map((values) => orderBy(values, field, direction)),
          map((values) => slice(values, 0, 5))
        )
      )
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(
        takeUntil(this.subscriptionDestroyer),
        tap(() => {
          this.sortSubject.next({
            field: this.sort.active,
            direction: this.sort.direction as 'asc' | 'desc',
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }
}

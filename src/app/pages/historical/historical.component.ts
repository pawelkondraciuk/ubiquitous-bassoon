import { Component, OnInit } from '@angular/core';
import { AppQuery } from '@state/app.query';
import { HistoricalQuery } from './state/historical.query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent implements OnInit {
  loading$ = this.appQuery.loading$;
  chartData$ = this.historicalQuery.chartData$;
  currency$ = this.historicalQuery.currency$;

  colorScheme = {
    domain: ['#ff4081'],
  };

  constructor(
    private appQuery: AppQuery,
    private historicalQuery: HistoricalQuery,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe().subscribe();
  }
}

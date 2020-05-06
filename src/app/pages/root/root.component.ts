import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, withLatestFrom, filter, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from '@state/app.service';
import { AppQuery } from '@state/app.query';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;

  loading$ = this.appQuery.loading$;
  baseCurrency$ = this.appQuery.baseCurrency$;
  currencies$ = this.appQuery.currencies$;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private appQuery: AppQuery,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
  }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap(({ currency }) => this.appService.getLatest(currency))
    ).subscribe();
  }

  onToggleSidebar() {
    this.drawer.toggle();
  }

  onCurrencyChange(baseCurrency: string) {
    this.router.navigate([baseCurrency]);
  }
}

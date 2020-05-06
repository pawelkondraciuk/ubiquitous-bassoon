import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, withLatestFrom, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from './state/app.service';
import { AppQuery } from './state/app.query';
import { AppStore } from './state/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private appStore: AppStore,
    private appQuery: AppQuery,
    router: Router,
  ) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
    this.appService.getInitialData().subscribe();
  }

  onToggleSidebar() {
    this.drawer.toggle();
  }

  onCurrencyChange(baseCurrency: string) {
    this.appStore.update({ ui: { baseCurrency } });
  }
}

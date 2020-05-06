import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, withLatestFrom, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from '@state/app.service';
import { AppQuery } from '@state/app.query';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatSidenav;

  loading$ = this.appQuery.loading$;
  baseCurrency$ = this.appQuery.baseCurrency$;
  currencies$ = this.appQuery.currencies$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  private subscriptionDestroyer = new Subject();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private appQuery: AppQuery,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
    .pipe(
      takeUntil(this.subscriptionDestroyer),
      switchMap(({ currency }) => this.appService.getLatest(currency))
    ).subscribe();
    this.router.events.pipe(
      takeUntil(this.subscriptionDestroyer),
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  onToggleSidebar() {
    this.drawer.toggle();
  }

  onCurrencyChange(newCurrency: string) {
    // nasty hack
    const url = this.router.url;
    const newUrl = url.replace(/^(\/)(\w{3})/, `$1${newCurrency}`);
    this.router.navigateByUrl(newUrl);
  }
}

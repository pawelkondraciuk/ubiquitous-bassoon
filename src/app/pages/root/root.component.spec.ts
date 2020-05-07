import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootComponent } from './root.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppService } from '@state/app.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, of } from 'rxjs';
import { AppQuery } from '@state/app.query';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let appService: jasmine.SpyObj<AppService>;
  let appQuery: jasmine.SpyObj<AppQuery>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRouteStub;
  const subjects = {
    loading$: new Subject(),
    baseCurrency$: new Subject(),
    currencies$: new Subject(),
    events$: new Subject(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [RootComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl'], {
            events: subjects.events$.asObservable(),
            url: '/USD/top',
          }),
        },
        {
          provide: AppService,
          useValue: jasmine.createSpyObj('AppService', ['getLatest']),
        },
        {
          provide: AppQuery,
          useValue: jasmine.createSpyObj(
            'AppQuery',
            {},
            {
              loading$: subjects.loading$.asObservable(),
              baseCurrency$: subjects.baseCurrency$.asObservable(),
              currencies$: subjects.currencies$.asObservable(),
            }
          ),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    appService = TestBed.get(AppService);
    appQuery = TestBed.get(AppQuery);
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    appService.getLatest.and.callFake(() => of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get latest data on init', () => {
    expect(appService.getLatest).toHaveBeenCalledWith(null);
  });

  it('should get latest data when router parameter changes', () => {
    route.setParamMap({ currency: 'USD' });
    expect(appService.getLatest).toHaveBeenCalledWith('USD');
  });

  it('should close drawer on navigation', () => {
    component.isHandset$ = of();
    component.drawer = jasmine.createSpyObj('MatSidenav', ['close']);
    subjects.events$.next(new NavigationEnd(0, '/', '/'));
    expect(component.drawer.close).toHaveBeenCalled();
  });

  it('should change router url on currency change', () => {
    component.onCurrencyChange('EUR');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/EUR/top');
  });
});

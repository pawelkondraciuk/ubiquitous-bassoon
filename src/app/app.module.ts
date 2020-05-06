import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectCurrencyComponent } from './components/select-currency/select-currency.component';
import { ENDPOINT_URL } from './endpoint-url.token';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './pages/root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectCurrencyComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [{
    provide: ENDPOINT_URL,
    useValue: 'https://api.exchangeratesapi.io',
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';


@NgModule({
  imports: [
    CommonModule,
    RatesRoutingModule
  ],
  declarations: [RatesComponent],
})
export class RatesModule { }

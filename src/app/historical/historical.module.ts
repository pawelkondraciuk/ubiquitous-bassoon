import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalRoutingModule } from './historical-routing.module';
import { HistoricalComponent } from './historical.component';


@NgModule({
  imports: [
    CommonModule,
    HistoricalRoutingModule
  ],
  declarations: [HistoricalComponent],
})
export class HistoricalModule { }

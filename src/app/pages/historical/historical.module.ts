import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalRoutingModule } from './historical-routing.module';
import { HistoricalComponent } from './historical.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    HistoricalRoutingModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    NgxChartsModule
  ],
  declarations: [HistoricalComponent],
})
export class HistoricalModule { }

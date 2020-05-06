import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RatesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatButtonModule,
  ],
  declarations: [RatesComponent],
})
export class RatesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifferenceRoutingModule } from './difference-routing.module';
import { DifferenceComponent } from './difference.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    DifferenceRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  declarations: [DifferenceComponent],
})
export class DifferenceModule {}

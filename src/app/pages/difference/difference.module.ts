import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifferenceRoutingModule } from './difference-routing.module';
import { DifferenceComponent } from './difference.component';

@NgModule({
  imports: [
    CommonModule,
    DifferenceRoutingModule
  ],
  declarations: [DifferenceComponent],
})
export class DifferenceModule { }

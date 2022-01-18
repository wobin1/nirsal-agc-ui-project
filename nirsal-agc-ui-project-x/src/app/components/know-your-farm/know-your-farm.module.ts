import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ContenteditableModule } from '@ng-stack/contenteditable';

import { KnowYourFarmRoutingModule } from './know-your-farm-routing.module';
import { FarmersAllocationComponent } from './farmers-allocation/farmers-allocation.component';
import { FarmBoundaryComponent } from './farm-boundary/farm-boundary.component';


@NgModule({
  declarations: [FarmersAllocationComponent, FarmBoundaryComponent],
  imports: [
    CommonModule,
    KnowYourFarmRoutingModule,
    FormsModule,
    SharedModule,
    ContenteditableModule
  ]
})
export class KnowYourFarmModule { }

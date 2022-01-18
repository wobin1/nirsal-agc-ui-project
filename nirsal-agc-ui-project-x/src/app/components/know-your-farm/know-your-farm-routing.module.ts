import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmersAllocationComponent } from './farmers-allocation/farmers-allocation.component';
import { FarmBoundaryComponent } from './farm-boundary/farm-boundary.component';

const routes: Routes = [
  {
    path: 'farmers-allocation',
    component: FarmersAllocationComponent,
    data: {
      title: 'Know Your Farm',
      breadcrumb: 'Farmers Allocation'
    }
  },
  {
    path: 'farm-boundary',
    component: FarmBoundaryComponent,
    data: {
      title: 'Know Your Farm',
      breadcrumb: 'Farm Boundary'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowYourFarmRoutingModule { }

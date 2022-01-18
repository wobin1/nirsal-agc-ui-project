import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelizationViewerComponent } from './parcelization-viewer/parcelization-viewer.component';
import { VastIdComponent } from './vast-id/vast-id.component';
import { CrossGuaranteeComponent } from './cross-guarantee/cross-guarantee.component';
import { FieldVerificationComponent } from './field-verification/field-verification.component';

const routes: Routes = [
  {
    path: 'parcelization-viewer',
    component: ParcelizationViewerComponent,
    data: {
      title: 'Know Your AGC',
      breadcrumb: 'Parcelization Viewer'
    }
  },
  {
    path: 'cross-guarantee',
    component: CrossGuaranteeComponent,
    data: {
      title: 'Know Your AGC',
      breadcrumb: 'Cross Guarantee'
    }
  },
  {
    path: 'field-verification',
    component: FieldVerificationComponent,
    data: {
      title: 'Know Your AGC',
      breadcrumb: 'Field Verification'
    }
  },
  {
    path: 'vast-id',
    component: VastIdComponent,
    data: {
      title: 'Know Your AGC',
      breadcrumb: 'VAsT ID'
    }
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowYourAgcRoutingModule { }

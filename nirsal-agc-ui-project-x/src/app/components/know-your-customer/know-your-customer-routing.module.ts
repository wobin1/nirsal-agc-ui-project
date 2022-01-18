import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgcInformationComponent } from './agc-information/agc-information.component';
import { BvnVerificationComponent } from './bvn-verification/bvn-verification.component';
import { CrcComponent } from './crc/crc.component';

const routes: Routes = [
  {
    path: 'agc-information',
    component: AgcInformationComponent,
    data: {
      title: 'Details of AGC',
      breadcrumb: 'AGC Details'
    }
  },
  {
    path: 'bvn-verification',
    component: BvnVerificationComponent,
    data: {
      title: 'Member BVN Verification',
      breadcrumb: 'BVN Verification'
    }
  },
  {
    path: 'crc',
    component: CrcComponent,
    data: {
      title: 'Credit Risk Check',
      breadcrumb: 'CRC'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowYourCustomerRoutingModule { }

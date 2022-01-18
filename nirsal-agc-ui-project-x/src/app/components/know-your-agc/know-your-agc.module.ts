import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowYourAgcRoutingModule } from './know-your-agc-routing.module';
import { ParcelizationViewerComponent } from './parcelization-viewer/parcelization-viewer.component';
import { VastIdComponent } from './vast-id/vast-id.component';
import { CrossGuaranteeComponent } from './cross-guarantee/cross-guarantee.component';
import { FieldVerificationComponent } from './field-verification/field-verification.component';


@NgModule({
  declarations: [ParcelizationViewerComponent, VastIdComponent, CrossGuaranteeComponent, FieldVerificationComponent],
  imports: [
    CommonModule,
    KnowYourAgcRoutingModule
  ]
})
export class KnowYourAgcModule { }

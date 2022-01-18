import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ContenteditableModule } from '@ng-stack/contenteditable';


import { KnowYourCustomerRoutingModule } from './know-your-customer-routing.module';

import { AgcInformationComponent } from './agc-information/agc-information.component';
import { BvnVerificationComponent } from './bvn-verification/bvn-verification.component';
import { CrcComponent } from './crc/crc.component';

@NgModule({
  declarations: [AgcInformationComponent, BvnVerificationComponent, CrcComponent],
  imports: [
    CommonModule,
    FormsModule,
    KnowYourCustomerRoutingModule,
    ContenteditableModule
  ]
})
export class KnowYourCustomerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { KnowYourLeaderRoutingModule } from './know-your-leader-routing.module';

import { AgcPresidentComponent } from './agc-president/agc-president.component';
import { AgcVicePresidentComponent } from './agc-vice-president/agc-vice-president.component';
import { AgcExecutiveDirectorComponent } from './agc-executive-director/agc-executive-director.component';
import { KylSummaryComponent } from './kyl-summary/kyl-summary.component';
import { SharedComponent } from './shared/shared.component';


@NgModule({
  declarations: [AgcPresidentComponent, AgcVicePresidentComponent, AgcExecutiveDirectorComponent, KylSummaryComponent, SharedComponent],
  imports: [
    CommonModule,
    FormsModule,
    KnowYourLeaderRoutingModule
  ]
})
export class KnowYourLeaderModule { }

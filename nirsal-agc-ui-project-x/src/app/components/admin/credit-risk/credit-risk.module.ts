import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRiskRoutingModule } from './credit-risk-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shell/shell.component';


@NgModule({
  declarations: [DashboardComponent, ShellComponent],
  imports: [
    CommonModule,
    CreditRiskRoutingModule
  ]
})
export class CreditRiskModule { }

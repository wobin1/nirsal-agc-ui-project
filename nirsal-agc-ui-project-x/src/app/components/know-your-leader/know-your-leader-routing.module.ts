import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgcPresidentComponent } from './agc-president/agc-president.component';
import { AgcVicePresidentComponent } from './agc-vice-president/agc-vice-president.component';
import { AgcExecutiveDirectorComponent } from './agc-executive-director/agc-executive-director.component';
import { KylSummaryComponent } from './kyl-summary/kyl-summary.component';

const routes: Routes = [
  {
    path: 'president',
    component: AgcPresidentComponent,
    data: {
      title: 'President Details',
      breadcrumb: 'AGC President'
    }
  },
  {
    path: 'vice-president',
    component: AgcVicePresidentComponent,
    data: {
      title: 'Vice President Details',
      breadcrumb: 'AGC Vice President'
    }
  },
  {
    path: 'director-of-finance',
    component: AgcExecutiveDirectorComponent,
    data: {
      title: 'Director of Finance Details',
      breadcrumb: 'AGC Director of Finance'
    }
  },
  {
    path: 'kyl-summary',
    component: KylSummaryComponent,
    data: {
      title: 'AGC Leaders',
      breadcrumb: 'KYL Summary'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowYourLeaderRoutingModule { }

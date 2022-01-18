import { Routes } from '@angular/router';

import { TermsAndConditionsComponent } from '../../components/terms-and-conditions/terms-and-conditions.component';

export const content: Routes = [
  {
    path: '',
    redirectTo: '/404',
    pathMatch: 'full'
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    data: {
      title: 'Terms and Conditions',
      breadcrumb: 'T & C'
    }
  },
  {
    path: 'know-your-leader',
    loadChildren: () => import('../../components/know-your-leader/know-your-leader.module').then(m => m.KnowYourLeaderModule),
    data: {
      title: 'Know Your Leader',
      breadcrumb: 'KYL'
    }
  },
  {
    path: 'know-your-customer',
    loadChildren: () => import('../../components/know-your-customer/know-your-customer.module').then(m => m.KnowYourCustomerModule),
    data: {
      title: 'Know Your Customer',
      breadcrumb: 'KYC'
    }
  },
  {
    path: 'know-your-farm',
    loadChildren: () => import('../../components/know-your-farm/know-your-farm.module').then(m => m.KnowYourFarmModule),
    data: {
      title: 'Know Your Farm',
      breadcrumb: 'KYF'
    }
  },
  {
    path: 'know-your-agc',
    loadChildren: () => import('../../components/know-your-agc/know-your-agc.module').then(m => m.KnowYourAgcModule),
    data: {
      title: 'Know Your AGC',
      breadcrumb: 'KYAGC'
    }
  },
];

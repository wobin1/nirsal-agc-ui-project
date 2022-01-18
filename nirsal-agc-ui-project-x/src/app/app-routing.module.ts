import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from './shared/routes/routes';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewAgcApplicationComponent } from './components/new-agc-application/new-agc-application.component';
import { FieldVerificationDashboardComponent } from './components/field-verification-dashboard/field-verification-dashboard.component';
import { PmroDashboardComponent} from './components/pmro-dashboard/pmro-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CrcDashboardComponent } from './components/crc-dashboard/crc-dashboard.component'


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'new-agc-application',
    component: NewAgcApplicationComponent
  },
  {
    path: 'field-verification-dashboard',
    component: FieldVerificationDashboardComponent
  },
  {
    path: 'pmro-dashboard',
    component: PmroDashboardComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'crc-dashboard',
    component: CrcDashboardComponent
  },
  {
    path: 'agc-application',
    component: ContentComponent,
    children: content
  },
  {
    path: 'admin/credit-risk',
    component: ContentComponent,
    loadChildren: () => import('./components/admin/credit-risk/credit-risk.module').then(m => m.CreditRiskModule)
  },
  {
    path: 'know-your-leader/kyl-summary',
    component: ContentComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
    preloadingStrategy: PreloadAllModules,
    useHash: false
})],
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

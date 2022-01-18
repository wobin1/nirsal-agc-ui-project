import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { KnowYourLeaderModule } from './components/know-your-leader/know-your-leader.module';

import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewAgcApplicationComponent } from './components/new-agc-application/new-agc-application.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { PmroDashboardComponent } from './components/pmro-dashboard/pmro-dashboard.component';
import { FieldVerificationDashboardComponent } from './components/field-verification-dashboard/field-verification-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { CrcDashboardComponent } from './components/crc-dashboard/crc-dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    TermsAndConditionsComponent,
    DashboardComponent,
    NewAgcApplicationComponent,
    PageNotFoundComponent,
    RegisterComponent,
    PmroDashboardComponent,
    FieldVerificationDashboardComponent,
    AdminDashboardComponent,
    CrcDashboardComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    KnowYourLeaderModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MatButtonModule, MatMenuModule, MatIconModule, MAT_DATE_LOCALE, } from '@angular/material/';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DialogService } from './services/dialog.service';
import { CommonApiService } from './services/common-api.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SeekerDashboardComponent } from './modules/dashboard/seeker-dashboard/seeker-dashboard.component';
import { ProviderDashboardComponent } from './modules/dashboard/provider-dashboard/provider-dashboard.component';
import { UniversityDashboardComponent } from './modules/dashboard/university-dashboard/university-dashboard.component';
import { ExpertDashboardComponent } from './modules/dashboard/expert-dashboard/expert-dashboard.component';
import { SeekerProfileComponent } from './modules/profiles/seeker-profile/seeker-profile.component';
import { ProviderProfileComponent } from './modules/profiles/provider-profile/provider-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SeekerDashboardComponent,
    ProviderDashboardComponent,
    UniversityDashboardComponent,
    ExpertDashboardComponent,
    SeekerProfileComponent,
    ProviderProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    SharedModule.forRoot(),
  ],
  
  providers: [  AuthService, DialogService, CanDeactivateGuard,{provide: MAT_DATE_LOCALE, useValue: 'en-IN'}, CommonApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

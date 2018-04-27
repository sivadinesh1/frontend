import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MatButtonModule, MatMenuModule, MatIconModule, MAT_DATE_LOCALE, MatDialogModule, } from '@angular/material/';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent, } from './home/home.component';
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



import { UniversityComponent } from './modules/whyskillmatic/university/university.component';
import { ExpertsComponent } from './modules/whyskillmatic/experts/experts.component';
import { SeekersComponent } from './modules/whyskillmatic/seekers/seekers.component';
import { ProvidersComponent } from './modules/whyskillmatic/providers/providers.component';
import { IndustryComponent } from './modules/whyskillmatic/industry/industry.component';

import { DashboardApiService } from './services/dashboard-api.service';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { DashboardResolver } from './services/dashboard-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SeekerDashboardComponent,
    ProviderDashboardComponent,
    UniversityDashboardComponent,
    ExpertDashboardComponent,
   
   
    UniversityComponent,
    ExpertsComponent,
    SeekersComponent,
    ProvidersComponent,
    IndustryComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    
    MatIconModule,
    MatDialogModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    SharedModule.forRoot(),
  ],

  entryComponents: [
    
],
  
  providers: [  AuthService, DialogService, DashboardApiService, DashboardResolver, CanDeactivateGuard,{provide: MAT_DATE_LOCALE, useValue: 'en-IN'}, CommonApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

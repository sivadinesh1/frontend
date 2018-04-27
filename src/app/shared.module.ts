import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlidPipe } from './shared/pipe/url-id.pipe';
import { SafePipe } from './shared/pipe/safe-html.pipe';
import { EscapeHtmlPipe } from './shared/pipe/keep-html.pipe';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { NgPipesModule } from 'ngx-pipes';


import {Routes, RouterModule} from '@angular/router';
import { CheckBooleanPipe } from './shared/pipe/check-boolean.pipe';
import { NullToQuotePipe } from './shared/pipe/null-quote.pipe';
import { NullToZeroPipe } from './shared/pipe/null-zero.pipe';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SignindialogueComponent } from './auth/signindialogue/signindialogue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignupdialogueComponent } from './auth/signupdialogue/signupdialogue.component';
import { VideodialogueComponent } from './auth/videodialogue/videodialogue.component';
import { MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatCheckbox, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { SeekerRegistrationComponent } from './auth/sign-up/seeker/seeker-registration/seeker-registration.component';
import { ProviderRegistrationComponent } from './auth/sign-up/provider/provider-registration/provider-registration.component';

import { PrivacypolicyComponent } from './shared/privacypolicy/privacypolicy.component';
import { CookiepolicyComponent } from './shared/cookiepolicy/cookiepolicy.component';
import { TermsComponent } from './shared/terms/terms.component';
import { CookiepolicydialogueComponent } from './shared/cookiepolicydialogue/cookiepolicydialogue.component';
import { DropdownmenuComponent } from './shared/dropdownmenu/dropdownmenu.component';

import { UniversityRegistrationComponent } from './auth/sign-up/university/university-registration/university-registration.component';

import { IndustryRegistrationComponent } from './auth/sign-up/industry/industry-registration/industry-registration.component';
import { IndustryDashboardComponent } from './modules/dashboard/industry-dashboard/industry-dashboard.component';
import { ExpertRegistrationComponent } from './auth/sign-up/expert/expert-registration/expert-registration.component';
import { ExpertsVideoComponent } from './modules/whyskillmatic/experts/experts-video/experts-video.component';

import { IndustryVideoComponent } from './modules/whyskillmatic/industry/industry-video/industry-video.component';
import { UniversityVideoComponent } from './modules/whyskillmatic/university/university-video/university-video.component';
import { SeekerVideoComponent } from './modules/whyskillmatic/seekers/seeker-video/seeker-video.component';
import { ProviderVideoComponent } from './modules/whyskillmatic/providers/provider-video/provider-video.component';
import { ForgotPassDialogueComponent } from './auth/forgot-pass-dialogue/forgot-pass-dialogue.component';
import { ConfirmPasswordResetComponent } from './auth/forgot-pass-dialogue/confirm-password-reset/confirm-password-reset.component';
import { UniversityProfileComponent } from './modules/profiles/university-profile/university-profile.component';
import { IndustryProfileComponent } from './modules/profiles/industry-profile/industry-profile.component';
import { SeekerProfileComponent } from './modules/profiles/seeker-profile/seeker-profile.component';
import { ProviderProfileComponent } from './modules/profiles/provider-profile/provider-profile.component';




@NgModule({
  imports: [

    CommonModule,
    NgPipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatInputModule

  ],
  declarations: [
    CheckBooleanPipe,
    NullToQuotePipe,
    NullToZeroPipe,
    UrlidPipe,
    SafePipe,
    EscapeHtmlPipe,
    MenubarComponent,
    FooterComponent,
    SignindialogueComponent,
    SignupdialogueComponent,
    VideodialogueComponent,
    AboutUsComponent,
    SeekerRegistrationComponent,
    ProviderRegistrationComponent,

    PrivacypolicyComponent,
    CookiepolicyComponent,
    TermsComponent,
    CookiepolicydialogueComponent,
    DropdownmenuComponent,

    UniversityRegistrationComponent,

    IndustryRegistrationComponent,
    ExpertRegistrationComponent,
    IndustryDashboardComponent,
    ExpertsVideoComponent,
    ProviderVideoComponent,
    IndustryVideoComponent,
    UniversityVideoComponent,
    SeekerVideoComponent,
    ForgotPassDialogueComponent,
    ConfirmPasswordResetComponent,
    UniversityProfileComponent,
    IndustryProfileComponent,
    SeekerProfileComponent,
    ProviderProfileComponent

  ],
  exports: [
    CommonModule,
    CheckBooleanPipe,
    NullToQuotePipe,
    NullToZeroPipe,
    EscapeHtmlPipe,
    UrlidPipe,
    SafePipe,
    NgPipesModule,
    FooterComponent,
    MenubarComponent,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatInputModule,
    RouterModule
  ],
  entryComponents: [
    SignindialogueComponent,
    SignupdialogueComponent,
    VideodialogueComponent,
    ExpertsVideoComponent,
    ProviderVideoComponent,
    IndustryVideoComponent,
    UniversityVideoComponent,
    CookiepolicydialogueComponent,
    ForgotPassDialogueComponent,
    ConfirmPasswordResetComponent
],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UrlidPipe]
    };
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';

import { SignInComponent } from './auth/sign-in/sign-in.component';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';


const routes: Routes = [

  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },

];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
   
    RouterModule.forChild(routes)
  ],
  declarations: [
    
    ForgotPassComponent,
    
    SignInComponent,
    
    SignUpComponent,


    

  ]
})
export class AuthModule { }




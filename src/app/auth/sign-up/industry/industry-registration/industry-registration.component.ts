import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material';
import { PasswordValidation } from '../../../../shared/utils/PasswordValidation';
import { VideodialogueComponent } from '../../../videodialogue/videodialogue.component';
import { TermsComponent } from '../../../../shared/terms/terms.component';
import { CookiepolicydialogueComponent } from '../../../../shared/cookiepolicydialogue/cookiepolicydialogue.component';

@Component({
  selector: 'app-industry-registration',
  templateUrl: './industry-registration.component.html',
  styleUrls: ['./industry-registration.component.css', '../../../auth-style.component.css']
})
export class IndustryRegistrationComponent implements OnInit {

  errmsg: any;
  responsemsg: any;
  confirmbox: boolean = false;
  secretcode: any;
  otpstatus:any;

  registrationconfirm: any;

  signupForm: FormGroup;
  PHONE_REGEX= /^[6-9]\d{9}$/;
  PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

  emailsignup = [
    {
      firstname: '',
      lastname: '',
      email: '',
      phno: '',
      password: '',
      profiletype: '',
      company: '',
      organizationtype: '',
      jobrole:'',
      organizationsize: ''

    }
  ]

  apiresponse: any;

  
  organizationsizes: string[] = ['1 - 100', '101 - 500', '501 - 1000', '1001 - 5000', '5001 - 10,0000', '> 10,000'];
  organizationtypes: string[] = ['Corporate','Academic','Government','Non-profit','Other'];
  
  
  
  
  
  

  constructor(private _authservice: AuthService, private _router: Router, private _fb: FormBuilder,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }


  ngOnInit() {
    this.signupForm =  this._fb.group({
      'profile': new FormControl(null, Validators.required),
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'lastname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'emailid': new FormControl(null, [Validators.required, Validators.email]),
      'mobile': new FormControl('', [ Validators.pattern(this.PHONE_REGEX)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6),  Validators.maxLength(12), Validators.pattern(this.PASS_REGEX)]),
      'confirmPassword': new FormControl(null),
      

      'jobrole': new FormControl(null, [ Validators.maxLength(60)]),
      'company': new FormControl(null, [Validators.maxLength(60)]),
      'organizationtype': new FormControl(null, [Validators.maxLength(60)]),
      'organizationsize': new FormControl(null, [Validators.maxLength(60)]),
      
    },
     {
      validator: PasswordValidation.MatchPassword // your validation method
    }
  );

  this.signupForm.patchValue({
    profile: 'Industry',
   });
 
  }


  validatemobile() {
    this.signupForm.controls['mobile'].setValidators([Validators.pattern(this.PHONE_REGEX)])
    this.signupForm.controls['mobile'].updateValueAndValidity();
    return true;

  }
 
 
 

  


  policyDialog() {
    this.dialog.open(CookiepolicydialogueComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  successExit() {
    this.dialog.closeAll();

  }

  onSubmit() {

    console.log('fffffffful.va..' + this.signupForm.value.emailid);
    console.log('fffffffful.va..' + this.signupForm.value.mobile);

    this.emailsignup[0].firstname = this.signupForm.value.firstname;
    this.emailsignup[0].lastname = this.signupForm.value.lastname;
    this.emailsignup[0].email = this.signupForm.value.emailid;
    this.emailsignup[0].phno = this.signupForm.value.mobile;
    this.emailsignup[0].password = this.signupForm.value.password;
    this.emailsignup[0].profiletype = this.signupForm.value.profile;
    
    
    this.emailsignup[0].jobrole = this.signupForm.value.jobrole;
    this.emailsignup[0].company = this.signupForm.value.company;
    this.emailsignup[0].organizationsize = this.signupForm.value.organizationsize;
    this.emailsignup[0].organizationtype = this.signupForm.value.organizationtype;




    this._authservice.register(this.emailsignup).subscribe(
      data => {
     
        this.apiresponse = data;
     console.log('ABCD..'+ this.apiresponse.message);
        if (this.apiresponse.message === 'DP-EMAIL') {
          this.responsemsg = "Email Already Exists for this Company";
        } else if (this.apiresponse.message === 'DP-USERNAME') {
            this.responsemsg = "Username Already Exists";  
        } else if (this.apiresponse.message === 'SUCCESS') {

          localStorage.setItem('token', this.emailsignup[0].firstname);
          this._authservice.isLoginSubject.next(true);
          
          this.registrationconfirm = 'success';
          console.log("user  created.. successfuly");
          this.responsemsg = "User Successfully Created"; 
          this._cdr.markForCheck();
          // localStorage.setItem('currentUser', this.emailsignup[0].fullname);
          // this._cdr.detectChanges();
          this._router.navigate(['/']);
        }

      }

    );

  }



}
 




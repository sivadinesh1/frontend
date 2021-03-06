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
  selector: 'app-seeker-registration',
  templateUrl: './seeker-registration.component.html',
  styleUrls: ['./seeker-registration.component.css', '../../../auth-style.component.css']
})
export class SeekerRegistrationComponent implements OnInit {

  errmsg: any;
  responsemsg: any;
  confirmbox = false;
  otpsent = false;
  otpstatus: any;

  registrationconfirm: any;

  signupForm: FormGroup;
  mobile: FormControl;

  PHONE_REGEX = /^[6-9]\d{9}$/;
  PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

  emailsignup = [
    {
      firstname: '',
      lastname: '',
      email: '',
      phno: '',
      password: '',
      profiletype: '',

    }
  ];

  apiresponse: any;

  constructor(private _authservice: AuthService, private _router: Router, private _fb: FormBuilder,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }


  ngOnInit() {

    

    this.mobile = new FormControl('', [ Validators.pattern(this.PHONE_REGEX)]);


    this.signupForm =  this._fb.group({
      'profile': new FormControl(null, Validators.required),
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'lastname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'emailid': new FormControl(null, [Validators.required, Validators.email]),
      'mobile': this.mobile,
      'password': new FormControl(null, [Validators.required, Validators.minLength(6),
        Validators.maxLength(12), Validators.pattern(this.PASS_REGEX)]),
      'confirmPassword': new FormControl(null),
      'otp': new FormControl(null)

    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    }
  );

  this.signupForm.patchValue({
    profile: 'Seeker',
   });

  }


  validatemobile() {
    this.signupForm.controls['mobile'].setValidators([Validators.pattern(this.PHONE_REGEX)]);
    this.signupForm.controls['mobile'].updateValueAndValidity();
  }


  onSendOTP() {

    const phno = this.signupForm.value.mobile;
    console.log('yes>' + phno);
    this.otpstatus = '';
    if (phno === '') {
      this.otpstatus = 'Enter Valid Phone number.';
    }

    console.log('valid >> ' + this.validatemobile());



    this._authservice.sendOTP(phno).subscribe(
      data => {
        this.apiresponse = data;
        console.log('adfas>> ' + JSON.stringify(this.apiresponse));
        console.log('sdsd>>>>>>' + this.apiresponse.body.message);

        if (this.apiresponse.body.message === 'SUCCESS') {
          localStorage.setItem('otpsessionid', this.apiresponse.body.obj.details);

           this.otpsent = true;

        }

        this._cdr.markForCheck();
    },
      error => console.error(error)
  );


}

  VerifyOTP() {
    const otpentered = this.signupForm.value.otp;

    const otpsessionid = localStorage.getItem('otpsessionid');

    this._authservice.verifyOTP(otpsessionid, otpentered).subscribe(
      data => {
        this.apiresponse = data;

        if (this.apiresponse.message === 'SUCCESS') {
          localStorage.setItem('otpdetails', this.apiresponse.obj.details);

          if (this.apiresponse.obj.details === 'OTP Matched' ) {
            this.otpstatus = 'OTP Vefification Successful.';
          }

        } if (this.apiresponse.message === 'ERROR') {
          this.otpstatus = 'OTP Vefification Failed.';
        }

        this._cdr.markForCheck();
    },
      error => console.error(error)
  );
}

  policyDialog() {
    this.dialog.open(CookiepolicydialogueComponent);
  }

  successExit() {
    this.dialog.closeAll();
  }

  onSubmit() {

    this.emailsignup[0].firstname = this.signupForm.value.firstname;
    this.emailsignup[0].lastname = this.signupForm.value.lastname;
    this.emailsignup[0].email = this.signupForm.value.emailid;
    this.emailsignup[0].phno = this.signupForm.value.mobile;
    this.emailsignup[0].password = this.signupForm.value.password;
    this.emailsignup[0].profiletype = this.signupForm.value.profile;

    this._authservice.register(this.emailsignup).subscribe(
      data => {

        this.apiresponse = data;

        if (this.apiresponse.message === 'DP-EMAIL') {
          this.responsemsg = 'Email Already Exists for this Seeker';
        } else if (this.apiresponse.message === 'DP-USERNAME') {
            this.responsemsg = 'Username Already Exists';
        } else if (this.apiresponse.message === 'SUCCESS') {
          localStorage.setItem('token', this.emailsignup[0].firstname);
          this._authservice.isLoginSubject.next(true);
          this.registrationconfirm = 'success';
          this.responsemsg = 'User Successfully Created';
          this._cdr.markForCheck();
          this._router.navigate(['/']);
        }

      }

    );

  }
}

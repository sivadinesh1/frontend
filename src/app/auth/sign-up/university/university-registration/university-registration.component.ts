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
  selector: 'app-university-registration',
  templateUrl: './university-registration.component.html',
  styleUrls: ['./university-registration.component.css', '../../../auth-style.component.css']
})
export class UniversityRegistrationComponent implements OnInit {

  errmsg: any;
  responsemsg: any;
  confirmbox = false;
  secretcode: any;
  otpstatus: any;

  registrationconfirm: any;

  signupForm: FormGroup;
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
      universityname: '',
      collegename: '',
      position: '',
      universitysize: ''

    }
  ];

  apiresponse: any;

  universitysizes: string[] = ['1 - 100', '101 - 500', '501 - 1000', '1001 - 5000', '5001 - 10,0000', '> 10,000'];

  constructor(private _authservice: AuthService, private _router: Router, private _fb: FormBuilder,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }


  ngOnInit() {
    this.signupForm = this._fb.group({
      'profile': new FormControl(null, Validators.required),
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'lastname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'emailid': new FormControl(null, [Validators.required, Validators.email]),
      'mobile': new FormControl('', [Validators.pattern(this.PHONE_REGEX)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6),
        Validators.maxLength(12), Validators.pattern(this.PASS_REGEX)]),
      'confirmPassword': new FormControl(null),
      'universityname': new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      'collegename': new FormControl(null, [Validators.required, Validators.maxLength(60)]),

      'position': new FormControl(null, [Validators.maxLength(60)]),
      'universitysize': new FormControl(null, [Validators.maxLength(60)]),

    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    this.signupForm.patchValue({
      profile: 'University',
    });

  }


  validatemobile() {
    this.signupForm.controls['mobile'].setValidators([Validators.pattern(this.PHONE_REGEX)]);
    this.signupForm.controls['mobile'].updateValueAndValidity();
    return true;

  }




  onSendOTP() {

    const phno = this.signupForm.value.mobile;
    console.log('yes>' + phno);
    this.otpstatus = '';
    if (phno === '') {
      this.otpstatus = 'Enter Valid Phone number.';
    }

    this._authservice.sendOTP(phno).subscribe(
      data => {
        this.apiresponse = data;
        console.log('adfas>> ' + JSON.stringify(this.apiresponse));
        console.log('sdsd>>>>>>' + this.apiresponse.body.message);
        if (this.apiresponse.body.message === 'SUCCESS') {
          console.log('inside ');
          this.secretcode = this.apiresponse.body.additionalInfo;
          console.log('prin vavl' + this.secretcode);
        }



        this._cdr.markForCheck();
      },
      error => console.error(error)
    );

  }

  VerifyOTP() {
    const otp = this.signupForm.value.otp;

    console.log('entere OTP >> ' + otp);
    console.log('entere secret OTP >> ' + this.secretcode);

    if (otp === this.secretcode) {
      console.log('otp verification success');
      this.otpstatus = 'OTP Vefification Successful.';

    } else {
      console.log('otp verification failure');
      this.otpstatus = 'OTP Vefification Failed.';
    }

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
    this.emailsignup[0].universityname = this.signupForm.value.universityname;
    this.emailsignup[0].collegename = this.signupForm.value.collegename;
    this.emailsignup[0].position = this.signupForm.value.position;
    this.emailsignup[0].universitysize = this.signupForm.value.universitysize;




    this._authservice.register(this.emailsignup).subscribe(
      data => {

        this.apiresponse = data;
        console.log('ABCD..' + this.apiresponse.message);
        if (this.apiresponse.message === 'DP-EMAIL') {
          this.responsemsg = 'Email Already Exists for this University';
        } else if (this.apiresponse.message === 'DP-USERNAME') {
          this.responsemsg = 'Username Already Exists';
        } else if (this.apiresponse.message === 'SUCCESS') {

          localStorage.setItem('token', this.emailsignup[0].firstname);
          this._authservice.isLoginSubject.next(true);

          this.registrationconfirm = 'success';
          console.log('user  created.. successfuly');
          this.responsemsg = 'User Successfully Created';
          this._cdr.markForCheck();
          // localStorage.setItem('currentUser', this.emailsignup[0].fullname);
          // this._cdr.detectChanges();
          this._router.navigate(['/']);
        }

      }

    );

  }



}





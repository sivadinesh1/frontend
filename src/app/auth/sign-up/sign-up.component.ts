import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

declare let $: any;
declare var gapi: any;
 
declare var window: any;
declare var FB: any;

declare let webGlObject: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../auth-style.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  responsemsg: any;

  @ViewChild('f') signupForm: NgForm;

  loggedIn: boolean;

  public auth2: any;

  emailsignup = [
    {
      fullname: '',
      email: '',
      password: '',
      source: ''
    }
  ]


 apiresponse: any;

  currentUrl: string;

  constructor(private _authservice: AuthService, private _router: Router,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    $(function () {
      $('.parallax').parallax();
      var height = $(window).height();

      $('#container').css({ 'height': height + 'px' });


    }); // end of document ready

    this.currentUrl = this._router.url;
  }

  onSubmit() {

    console.log('fffffffful.va..' + this.signupForm.value.fullname);

    this.emailsignup[0].fullname = this.signupForm.value.fullname;
    this.emailsignup[0].email = this.signupForm.value.email;
    this.emailsignup[0].password = this.signupForm.value.password;
    this.emailsignup[0].source = 'EM';



    this._authservice.emailsignup(this.emailsignup).subscribe(
      data => {
     
        this.apiresponse = data;
     console.log('ABCD..'+ this.apiresponse.message);
        if (this.apiresponse.message === 'DP-EMAIL') {
          this.responsemsg = "Email Already Exists";
        } else if (this.apiresponse.message === 'DP-USERNAME') {
            this.responsemsg = "Username Already Exists";  
        } else if (this.apiresponse.message === 'SUCCESS') {

          localStorage.setItem('token', this.emailsignup[0].fullname);
          this._authservice.isLoginSubject.next(true);
          this._authservice.isCurrentUserSubject.next(this.emailsignup[0].fullname);

          console.log("user  created.. successfuly");
          this._cdr.markForCheck();
          // localStorage.setItem('currentUser', this.emailsignup[0].fullname);
          // this._cdr.detectChanges();
          this._router.navigate(['/']);
        }

      }

    );

  }


 

  ngAfterViewInit() {
   
  }





}

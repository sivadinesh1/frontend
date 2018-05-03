import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router} from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
declare let $: any;
declare var gapi: any;

declare var window: any;
declare var FB: any;

declare let webGlObject: any; 


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', '../auth-style.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnInit {
  apiresponse: any;
  @ViewChild('f') signinForm: NgForm;
  loggedIn: boolean;
  responsemsg: any;
  public auth2: any;

  res:any;

  loged: boolean = false;
  token: any;
  
  loginform = [
    {
      username: '',
      password: '',
      source:''
    }
  ]

  constructor(private _authservice: AuthService, private _router: Router,
    private _location: Location, 
   private _cdr: ChangeDetectorRef,
  
    private _zone: NgZone) { 

  }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
  }


  onSubmit() {
    console.log('inside. ts..' + this.signinForm);

      this.loginform[0].username = this.signinForm.value.username;
      this.loginform[0].password = this.signinForm.value.password;
      this.loginform[0].source = 'EM';

      this._authservice.emailsignin(this.loginform).subscribe(
        data => {
          this.apiresponse = data; 
  
          if(this.apiresponse.message === 'User not Found') {
            this.responsemsg = "User not Found";
          } else if (this.apiresponse.message === 'Password did not Match') {
            this.responsemsg = "Username & Password Mismatch";
          } else if(this.apiresponse.message === 'success') {
            console.log("Login.. successfuly"+this.apiresponse.additionalInfo);
           
            var obj = JSON.parse(this.apiresponse.additionalInfo);
            console.log("JSON Value"+ obj.username);

        
            localStorage.setItem('userrole', obj.isadmin);
            localStorage.setItem('username', obj.username);
            localStorage.setItem('isloggedin','true');

        
         
            localStorage.setItem('token', this.loginform[0].username);
            this._authservice.isLoginSubject.next(true);
            

            this._authservice.userRole.next(obj.isadmin);

          //  this._authservice.setUserLoggedIn();
            this._authservice.setLoginTrue();

            this._cdr.markForCheck();
            this._router.navigate(['/portal']);
          }
        } 
      );    
  }


    

}


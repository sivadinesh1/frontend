import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Router} from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { SignupdialogueComponent } from '../signupdialogue/signupdialogue.component';
declare let $: any;
declare var gapi: any;

declare var window: any;
declare var FB: any;

declare let webGlObject: any; 


@Component({
  selector: 'app-signindialogue',
  templateUrl: './signindialogue.component.html',
  styleUrls: ['./signindialogue.component.css', '../auth-style.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignindialogueComponent implements OnInit {
  apiresponse: any;
  

  signinForm: FormGroup;
  
  loggedIn: boolean;
  responsemsg: any;
  public auth2: any;

  res:any;

  loged: boolean = false;
  token: any;
  navurl:any;
  
  loginform = [
    {
      emailid: '',
      password: '',
      source:'',
      profiletype:''
    }
  ]

  profiles: string[] = ['Seeker', 'Provider', 'Expert', 'Industry', 'University'];



  constructor(private _authservice: AuthService, private _router: Router, private _fb: FormBuilder,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  
  ngOnInit() {
    this.signinForm =  this._fb.group({
      'profile': new FormControl(null, Validators.required),
     
      'emailid': new FormControl(null, [Validators.required, Validators.email]),
     
      'password': new FormControl(null, [Validators.required]),
      'rememberme': new FormControl(false),
     
    }
  );


 
  }
  ngAfterViewInit(){
  }

  signupDialog() {
    this.dialog.closeAll();
    
    this.dialog.open(SignupdialogueComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  onSubmit() {
    console.log('inside. ts..' + this.signinForm);

      this.loginform[0].emailid = this.signinForm.value.emailid;
      this.loginform[0].password = this.signinForm.value.password;
      this.loginform[0].source = 'EM';
      this.loginform[0].profiletype = this.signinForm.value.profile;

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

        
         
            localStorage.setItem('token', this.loginform[0].emailid);
            this._authservice.isLoginSubject.next(true);
            this._authservice.isCurrentUserSubject.next(this.apiresponse.additionalInfo);

            this._authservice.userRole.next(obj.isadmin);

            this._authservice.setUserLoggedIn();
            this._authservice.setLoginTrue();
            
            localStorage.setItem('currentpage','');

            this._cdr.markForCheck();
            this.dialog.closeAll();
            this._router.navigate(['/dashboard/' + this.signinForm.value.profile.toLowerCase() + '/'+ obj.userId]);
          }
        } 
      );    
  }


    

}


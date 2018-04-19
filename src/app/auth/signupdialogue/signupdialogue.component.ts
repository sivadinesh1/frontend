import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { PasswordValidation } from '../../shared/utils/PasswordValidation';

declare let $: any;
declare var gapi: any;
 
declare var window: any;
declare var FB: any;

declare let webGlObject: any;
@Component({
  selector: 'app-signupdialogue',
  templateUrl: './signupdialogue.component.html',
  styleUrls: ['./signupdialogue.component.css']
})
export class SignupdialogueComponent implements OnInit {

  errmsg: any;
  responsemsg: any;
  confirmbox: boolean = false;

  signupForm: FormGroup;

  profiletype: string = 'default';

  

  profiles: { pic: string, caption: string, desc: string }[] = [
    { "pic":"/assets/images/seeker.png", "caption": "Seeker", "desc":"Learn with a goal for better employability - SkillmaTic will be your ‘One stop Solution’ to connect to the professional world."   },
    { "pic":"/assets/images/provider.png", "caption": "Provider", "desc":"Bring innovation in teaching methods, enrich Industry connect and access to a large customer base."   },
    { "pic":"/assets/images/university.png", "caption": "Universities", "desc":"Shape up the curriculum & enhance the quality of education system in the years to come."   },
    { "pic":"/assets/images/expert.png", "caption": "Experts", "desc":"Increase your visibility through Community Connect in the Skill Development Ecosystem."   },
    { "pic":"/assets/images/industry.png", "caption": "Industry", "desc":"Re-skill talent and rewire the culture in the organization by developing appropriate competency programs through our comprehensive SkillmaTic solutions."   }
    
];


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

  constructor(private _authservice: AuthService, private _router: Router, private _fb: FormBuilder,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

 

  ngOnInit() {
    $(function () {
      $('.parallax').parallax();
      var height = $(window).height();

      $('#container').css({ 'height': height + 'px' });


    }); // end of document ready


    this.signupForm =  this._fb.group({
      'profile': new FormControl(null, Validators.required),
     
    }
  );
    

    this.currentUrl = this._router.url;
  }


onCloseConfirm() {

      this._router.navigate(['/seakerdashboard']);
     this.confirmbox = true;
       this.dialog.closeAll();
}


selectprofile(profile, i) {
  // var element = <HTMLInputElement> document.getElementById("radio-"+i);

  // console.log('vaas'+ profile.caption);

  // console.log('val of i >> ' + i);

  // element.checked = true;

  this.signupForm.patchValue({
    profile: profile.caption,
   });

   this.errmsg = "";
   this.onNext();

  // this.profiletype = profile.caption;

}

onNext() {
  // let selectedprofile = this.signupForm.value.profile;
  
  // if(selectedprofile == null || selectedprofile == undefined) {
  //   this.errmsg = "Please Select a Profile to Proceed."
  // } 

  this.profiletype = this.signupForm.value.profile;

  
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
        //  this._router.navigate(['/seakerdashboard']);
          this.confirmbox = true;
        //  this.dialog.closeAll();
        }

      }

    );

  }

}

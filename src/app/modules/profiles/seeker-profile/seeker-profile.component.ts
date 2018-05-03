

import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';



import { CommonApiService } from '../../../services/common-api.service';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { PasswordValidation } from '../../../shared/utils/PasswordValidation';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
declare let $: any;

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrls: ['./seeker-profile.component.css'],
})

export class SeekerProfileComponent implements OnInit {
  urlpath: { userid: string };

  paramsSubscription: Subscription;
  user: any;

  editProfileForm: FormGroup;

  changePasswordForm: FormGroup;

  page1 = true;
  page2 = false;
  page3 = false;

  responsemsg: any;
  selectedResumeFile: any;
  selectedProfilePic: any;

  picuploaderror: any;

  passwordstatusmsg: any;

  genders: string[] = ['Male', 'Female'];
  nationalities: string[] = ['India', 'Australia', 'America', 'Pakistan', 'Srilanka'];
  citizenships: string[] = ['India', 'Australia', 'America', 'Pakistan', 'Srilanka'];

  secondaryeducations: string[] = ['CBSE', 'ICSE', 'Matric', 'State Board'];
  pus: string[] = ['12th', 'ploytechnic'];
  ugs: string[] = ['BE', 'BSc - Computers', 'BA - English', 'BCom'];
  pgs: string[] = ['ME', 'MSC - Computers', 'MA - English', 'MCom'];

  experiences: string[] = ['0 - 1 Years', '1 - 3 Years', '3 - 5 Years', '> 10 years'];

  industries: string[] = ['Conputers', 'Mechanical'];
  subindustries: string[] = ['Data Analytics', 'Aeronotics'];

  ugspecialities: string[] = ['Computers', 'Electrical', 'Electronics', 'Civil'];


  PHONE_REGEX = /^[6-9]\d{9}$/;
  PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

  updateUser = [
    {
      firstname: '',
      lastname: '',
      email: '',
      phno: '',
      profiletype: '',
      dob: '',
      sex: '',
      nationality: '',
      citizenship: '',
      city: '',
      state: '',
      aadhar: '',
      pan: '',
      userid: '',
      smgoogle: '',
      smfacebook: '',
      smtwitter: '',
      smlinkedin: '',
      smyoutube: '',
      website: '',

      secondaryeducation: '',
      secedupercent: '',
      secedupassoutyr: '',
      puedu: '',
      puedupercent: '',
      puedupassoutyr: '',
      ugedu: '',
      ugspeciality: '',
      ugedupercent: '',
      ugedupassoutyr: '',
      pgedu: '',
      pgedupercent: '',
      pgedupassoutyr: '',
      experience: '',
      industry: '',
      subindustry: '',
      currentorg: '',
      designation: '',
      ctc: '',

    }
  ];


  apiresponse: any;

  constructor(private _commonapiservice: CommonApiService, private _fb: FormBuilder,
    private _route: ActivatedRoute, private _authservice: AuthService,
    private _router: Router, private _cdr: ChangeDetectorRef


  ) {

    this._router.events.subscribe((e: any) => {
      console.log('Router event:', e);
    });

  }


  ngOnInit() {
  this.urlpath = { userid: this._route.snapshot.params['userid'] };

  this.paramsSubscription = this._route.params
    .subscribe(
    (params: Params) => {
      this.urlpath.userid = params['userid'];
    }
    );

  this._route.fragment.subscribe();

  this.user = this._route.snapshot.data['userdata'];

  console.log(JSON.stringify(this.user));

  this.editProfileForm =  this._fb.group({
    'profile': new FormControl(null, Validators.required),
    'firstname': new FormControl(null, ),
    'lastname': new FormControl(null, ),
    'phno': new FormControl(null, ),
    'email': new FormControl(null, ),
    'dob': new FormControl(null, ),
    'sex': new FormControl(null, ),
    'nationality': new FormControl(null, ),
    'citizenship': new FormControl(null, ),
    'city': new FormControl(null, ),
    'state': new FormControl(null, ),
    'aadhar': new FormControl(null, ),
    'pan': new FormControl(null, ),
    'userid': new FormControl(null, ),

    'smgoogle': new FormControl(null, ),
    'smfacebook': new FormControl(null, ),
    'smtwitter': new FormControl(null, ),
    'smlinkedin': new FormControl(null, ),
    'smyoutube': new FormControl(null, ),
    'website': new FormControl(null, ),

    'secondaryeducation': new FormControl(null, ),

    'secedupercent': new FormControl(null, ),
    'secedupassoutyr': new FormControl(null, ),



    'puedu': new FormControl(null, ),
    'puedupercent': new FormControl(null, ),
    'puedupassoutyr': new FormControl(null, ),
    'ugedu': new FormControl(null, ),
    'ugspeciality': new FormControl(null, ),
    'ugedupercent': new FormControl(null, ),
    'ugedupassoutyr': new FormControl(null, ),
    'pgedu': new FormControl(null, ),
    'pgedupercent': new FormControl(null, ),
    'pgedupassoutyr': new FormControl(null, ),
    'experience': new FormControl(null, ),
    'industry': new FormControl(null, ),
    'subindustry': new FormControl(null, ),
    'currentorg': new FormControl(null, ),
    'designation': new FormControl(null, ),
    'ctc': new FormControl(null, ),

  }
);

this.editProfileForm.patchValue({
  profile: 'Seeker',
  firstname: this.user.firstName,
  lastname: this.user.lastName,
  phno: this.user.phone,
  email: this.user.email,
  dob: this.user.dob,
  sex: this.user.sex,
  nationality: this.user.nationality,
  citizenship: this.user.citizenship,
  city: this.user.city,
  state: this.user.state,
  aadhar: this.user.aadhar,
  pan: this.user.pan,
  userid: this.urlpath.userid,

  smgoogle: this.user.smgoogle,
  smfacebook: this.user.smfacebook,
  smtwitter: this.user.smtwitter,
  smlinkedin: this.user.smlinkedin,
  smyoutube: this.user.smyoutube,
  website: this.user.website,
  secondaryeducation: this.user.secondaryeducation,
  secedupercent: this.user.secedupercent,
  secedupassoutyr: this.user.secedupassoutyr,

  puedu: this.user.puedu,
  puedupercent:  this.user.puedupercent,
  puedupassoutyr:  this.user.puedupassoutyr,
  ugedu:  this.user.ugedu,
  ugspeciality:  this.user.ugspeciality,
  ugedupercent:  this.user.ugedupercent,
  ugedupassoutyr:  this.user.ugedupassoutyr,
  pgedu:  this.user.pgedu,
  pgedupercent:  this.user.pgedupercent,
  pgedupassoutyr:  this.user.pgedupassoutyr,
  experience:  this.user.experience,
  industry:  this.user.industry,
  subindustry:  this.user.subindustry,
  currentorg:  this.user.currentorg,
  designation:  this.user.designation,
  ctc:  this.user.ctc

 });

//  passwordConfirm: new FormControl('', Validators.minLength(2)),
//     }, passwordMatchValidator);

 this.changePasswordForm =  this._fb.group({
  'password': new FormControl(null, [Validators.required, Validators.minLength(6),
    Validators.maxLength(12), Validators.pattern(this.PASS_REGEX)]),
  'confirmPassword': new FormControl(null),

}, {
  validator: PasswordValidation.MatchPassword // your validation method
}
);


function passwordMatchValidator(g: FormGroup) {
  console.log('is matc call');
       return g.get('password').value === g.get('confirmPassword').value
          ? null : {'mismatch': true};
    }

  }



  onSubmit() {

    console.log('fffffffful.va..' + this.editProfileForm.value.firstname);

    this.updateUser[0].firstname = this.editProfileForm.value.firstname;
    this.updateUser[0].lastname = this.editProfileForm.value.lastname;

    this.updateUser[0].email = this.editProfileForm.value.email;
    this.updateUser[0].phno = this.editProfileForm.value.phno;
    this.updateUser[0].profiletype = this.editProfileForm.value.profiletype;
    this.updateUser[0].dob = this.editProfileForm.value.dob;
    this.updateUser[0].sex = this.editProfileForm.value.sex;
    this.updateUser[0].nationality = this.editProfileForm.value.nationality;
    this.updateUser[0].citizenship = this.editProfileForm.value.citizenship;
    this.updateUser[0].city = this.editProfileForm.value.city;
    this.updateUser[0].state = this.editProfileForm.value.state;
    this.updateUser[0].aadhar = this.editProfileForm.value.aadhar;
    this.updateUser[0].pan = this.editProfileForm.value.pan;
    this.updateUser[0].userid = this.editProfileForm.value.userid;
    this.updateUser[0].state = this.editProfileForm.value.state;

    this.updateUser[0].smgoogle = this.editProfileForm.value.smgoogle;
    this.updateUser[0].smfacebook = this.editProfileForm.value.smfacebook;
    this.updateUser[0].smtwitter = this.editProfileForm.value.smtwitter;
    this.updateUser[0].smlinkedin = this.editProfileForm.value.smlinkedin;
    this.updateUser[0].smyoutube = this.editProfileForm.value.smyoutube;
    this.updateUser[0].website = this.editProfileForm.value.website;
    this.updateUser[0].secondaryeducation = this.editProfileForm.value.secondaryeducation;
    this.updateUser[0].secedupercent = this.editProfileForm.value.secedupercent;
    this.updateUser[0].secedupassoutyr = this.editProfileForm.value.secedupassoutyr;

    this.updateUser[0].puedu = this.editProfileForm.value.puedu;

    this.updateUser[0].puedupercent = this.editProfileForm.value.puedupercent;
    this.updateUser[0].puedupassoutyr = this.editProfileForm.value.puedupassoutyr;
    this.updateUser[0].ugedu = this.editProfileForm.value.ugedu;
    this.updateUser[0].ugspeciality = this.editProfileForm.value.ugspeciality;
    this.updateUser[0].ugedupercent = this.editProfileForm.value.ugedupercent;
    this.updateUser[0].ugedupassoutyr = this.editProfileForm.value.ugedupassoutyr;
    this.updateUser[0].pgedu = this.editProfileForm.value.pgedu;
    this.updateUser[0].pgedupercent = this.editProfileForm.value.pgedupercent;
    this.updateUser[0].pgedupassoutyr = this.editProfileForm.value.pgedupassoutyr;
    this.updateUser[0].experience = this.editProfileForm.value.experience;
    this.updateUser[0].industry = this.editProfileForm.value.industry;
    this.updateUser[0].subindustry = this.editProfileForm.value.subindustry;
    this.updateUser[0].currentorg = this.editProfileForm.value.currentorg;
    this.updateUser[0].designation = this.editProfileForm.value.designation;
    this.updateUser[0].ctc = this.editProfileForm.value.ctc;

    this._commonapiservice.updateProfileUser(this.updateUser).subscribe(
      data => {

        this.apiresponse = data;
     console.log('ABCD..' + this.apiresponse.message);

          console.log('user  updated.. successfuly');
        this.page1 = false;
        this.page2 = true;
          this._cdr.markForCheck();


      }

    );

  }

  changePasswordMenu(event) {
    $('.db-leftmenu-changepassword').css({'background-color': '#e7f9fc' });
    $('.db-leftmenu-dashboard').css({'background-color': '#ffffff' });

    $('.db-leftmenu-changepassword').css({'border-left': '10px solid steelblue' });
    $('.db-leftmenu-dashboard').css({'border-left': '10px solid #ffffff' });

    this.page3 = true;
    this.page1 = false;
    this.page2 = false;
  }

  clickDashboardMenu(event) {
    $('.db-leftmenu-changepassword').css({'background-color': '#ffffff' });
    $('.db-leftmenu-changepassword').css({'border-left': '10px solid #ffffff' });
    $('.db-leftmenu-dashboard').css({'background-color': '#e7f9fc' });
    $('.db-leftmenu-dashboard').css({'border-left': '10px solid steelblue' });
    this.page3 = false;
    this.page1 = true;
    this.page2 = false;
  }

  handleInputChange (event) {

    const test = event.target.files.length;

    console.log('values for tes >> ' + test);
    console.log('file name >> ' + event.target.files[0].name);
    console.log('file size >> ' + event.target.files[0].size);
    console.log('file type >> ' + event.target.files[0].type);

    this.selectedProfilePic = event.target.files[0].name;

    const image = event.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();

    if (!image.type.match(pattern)) {
        console.error('File is not an image');
        alert('Not a Image File');
        this.picuploaderror = 'Not a Image File';
        // of course you can show an alert message here
        return;
    }

    if (event.target.files[0].size > 3000000) {
      alert('File Size Should be less than 3MB.');
      this.picuploaderror = 'File Size should be less than 3MB';
      return;
    }

    this.addcategoryimage(image);

  }

  addcategoryimage(image) {
    let headers = new HttpHeaders();

     headers = headers.set('Authorization', this.urlpath.userid);


     const formData = new FormData();
       formData.append('image', image);

       this._commonapiservice.addprofilepic(this.urlpath.userid, formData, headers)
       .subscribe(
       data => {
         this.responsemsg = data;

         if (this.responsemsg.message === 'success') {
          window.location.reload();
           this.responsemsg = 'Cover Image successfully uploaded.';
         } else if (this.responsemsg.message === 'Max File Size') {
           this.responsemsg = 'Max File size should be < 2MB.';
         }
         this._cdr.markForCheck();
       },
       (data: any[]) => console.log(data)
       ),
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log('Client-side error occured.');
         } else {
           console.log('Server-side error occured.');
         }
       };
  }


  uploadResume(event) {

    const test = event.target.files.length;

    console.log('values for tes >> ' + test);
    console.log('file name >> ' + event.target.files[0].name);
    console.log('file size >> ' + event.target.files[0].size);
    console.log('file type >> ' + event.target.files[0].type);

    this.selectedResumeFile = event.target.files[0].name;

    const resume = event.target.files[0];

    this.addResume(resume);

  }


  addResume(resume) {
    let headers = new HttpHeaders();

     headers = headers.set('Authorization', this.urlpath.userid);


     const formData = new FormData();
       formData.append('resume', resume);

       this._commonapiservice.addResume(this.urlpath.userid, formData, headers)
       .subscribe(
       data => {
         this.responsemsg = data;

         if (this.responsemsg.message === 'success') {
           this.responsemsg = 'Cover Image successfully uploaded.';
         } else if (this.responsemsg.message === 'Max File Size') {
           this.responsemsg = 'Max File size should be < 2MB.';
         }
         this._cdr.markForCheck();
       },
       (data: any[]) => console.log(data)
       ),
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log('Client-side error occured.');
         } else {
           console.log('Server-side error occured.');
         }
       };
  }



  changePassword() {
    const password = this.changePasswordForm.value.password;
    

    this._authservice.changePassword(password, this.urlpath.userid).subscribe(
      data => {
        this.apiresponse = data;
        console.log('adfas>> ' + JSON.stringify(this.apiresponse));
        console.log('sdsd>>>>>>' + this.apiresponse.message);
  
        if (this.apiresponse.message === 'SUCCESS') {
          this.passwordstatusmsg = 'Change Password Successful';
          if (this.changePasswordForm) {
            this.changePasswordForm.reset();
          }
          console.log('success');
        } else if (this.apiresponse.message === 'FAILURE') {
          this.passwordstatusmsg = 'Oops! Something went wrong in Change Password.';
          console.log('failure');
        }
  
  
    },
      error => console.error(error)
  );
  

  }

 



  }




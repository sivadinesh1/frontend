import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { CommonApiService } from '../services/common-api.service';
import {MatDialog, MAT_DIALOG_DATA, MatMenuTrigger} from '@angular/material';
import { SignindialogueComponent } from '../auth/signindialogue/signindialogue.component';
import { SignupdialogueComponent } from '../auth/signupdialogue/signupdialogue.component';
import { VideodialogueComponent } from '../auth/videodialogue/videodialogue.component';
import { Title } from '@angular/platform-browser';


declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

   profiles: { pic: string, caption: string, desc: string }[] = [
    { 'pic': '/assets/images/seeker.png', 'caption': 'Seeker',
    // tslint:disable-next-line:max-line-length
    'desc': 'Learn with a goal for better employability - SkillmaTic will be your ‘One stop Solution’ to connect to the professional world.'},
    { 'pic': '/assets/images/provider.png', 'caption': 'Provider',
    'desc': 'Bring innovation in teaching methods, enrich Industry connect and access to a large customer base.'   },
    { 'pic': '/assets/images/university.png', 'caption': 'Universities',
    'desc': 'Shape up the curriculum & enhance the quality of education system in the years to come.'   },
    { 'pic': '/assets/images/expert.png', 'caption': 'Experts',
    'desc': 'Increase your visibility through Community Connect in the Skill Development Ecosystem.'   },
    { 'pic': '/assets/images/industry.png', 'caption': 'Industry',
    // tslint:disable-next-line:max-line-length
    'desc': 'Re-skill talent and rewire the culture in the organization by developing appropriate competency programs through our comprehensive SkillmaTic solutions.'}

];

industrytrends: { pic: string,  desc: string }[] = [
  { 'pic': '/assets/images/article-1.png',  'desc': 'RETAIL'   },
  { 'pic': '/assets/images/article-2.png',  'desc': 'IT'   },
  { 'pic': '/assets/images/article-3.png',  'desc': 'FINANCE'   },
  { 'pic': '/assets/images/article-4.png',  'desc': 'MANUFACTURING'   },
  { 'pic': '/assets/images/article-5.png',  'desc': 'MEDICAL'   }

];


universities: { pic: string }[] = [
  { 'pic': '/assets/images/univ-01.png'},
  { 'pic': '/assets/images/univ-02.png'},
  { 'pic': '/assets/images/univ-03.png'},
  { 'pic': '/assets/images/univ-04.png'}
];

  constructor(private _commonapiservice: CommonApiService, public dialog: MatDialog,
    private _titleService: Title
  ) { }


  videoDialog() {
    this.dialog.open(VideodialogueComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  signupDialog() {
    this.dialog.open(SignupdialogueComponent, {
      data: {
        animal: 'panda'
      }
    });
  }


  ngOnInit() {
     $('.logo').css({'display': 'none' });

        $('.sticky').css({'grid-template-columns': '2fr 4fr 1fr 3fr' });
    // static page title
     this._titleService.setTitle('SkillmaTic - Home Page');

    this._commonapiservice.getCourses()
    .subscribe(
      data => {
        console.log('KKKK >> ' + JSON.stringify(data));
      },
            error => console.error(error)
    );

    localStorage.setItem('currentpage', 'home');

  }

  ngOnDestroy() {
    localStorage.setItem('currentpage', '');
    $('.logo').css({'display': 'grid' });
    $('.sticky').css({'grid-template-columns': '1fr 1fr 3fr 1fr 2fr' });

  }


}






// @Component({
//   selector: 'dialog-data-example-dialog',
//   templateUrl: 'dialog-data-example-dialog.html',
// })
// export class SigninDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
// }

// menu mouse over
// https://stackblitz.com/edit/angular-preufw


// let userTestStatus: { id: number, name: string }[] = [
//   { "id": 0, "name": "Available" },
//   { "id": 1, "name": "Ready" },
//   { "id": 2, "name": "Started" }
// ];

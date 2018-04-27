import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonApiService } from '../../../services/common-api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css', '../dashboard-styles.css']
})
export class SeekerDashboardComponent implements OnInit {
  urlpath: { userid: string };

  paramsSubscription: Subscription;
  user:any;
  coursesenrolled: number;
  coursescompleted: number;
  digitalbadging: any;
  chart = [];
  
  notifications: { notifcount: string,  notifdesc: string }[] = [
    { "notifcount": "12", "notifdesc":"Courses with no Enrolment"   },
    { "notifcount": "4", "notifdesc": "Courses with No Training Materials"   },
    { "notifcount": "6", "notifdesc": "Waiting Approval"   }
];

banners: {img: string, topic: string, desc: string, timevenue: string} [] = [
    {'img' : '/assets/images/dummy-course.png', 'topic': 'Webinar - Title and Topic',
'desc' : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. consequatur quos quam unde quia pariatur fugit dolorum maxime ' +
            'consequatur quos quam unde quia pariatur fugit dolorum maxime ',
'timevenue': 'Wednesday 10th May 0900 AM to 11.30 PM'}
];

  constructor(private _registrationservice: CommonApiService, private _fb: FormBuilder,
    private _route: ActivatedRoute, private _authservice: AuthService, 
    private _router: Router, private _cdr: ChangeDetectorRef
    
    
  ) { 
    
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

  this.coursesenrolled = 4;
  this.digitalbadging = 4.5;
  this.coursescompleted = 13;

  

  this.chart = new Chart('canvas', {


    type: 'bar',
    data: {
        labels: ["Java", "Html", "PHP", "Angular", ".Net", "SAP"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


  }
}

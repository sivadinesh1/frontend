import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonApiService } from '../../services/common-api.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

  urlpath: { confirmtokenid: string };

  paramsSubscription: Subscription;
  apiresponse: any;

  activationstatusmsg: any;

  constructor(private _registrationservice: CommonApiService, 
    private _route: ActivatedRoute, private _authservice: AuthService, 
    private _router: Router
  ) {
  }

  ngOnInit() {

  this.urlpath = { confirmtokenid: this._route.snapshot.params['confirmtokenid'] };
  this.paramsSubscription = this._route.params
    .subscribe(
    (params: Params) => {
      this.urlpath.confirmtokenid = params['confirmtokenid'];
    }
    );

  this._route.fragment.subscribe();


  console.log('PRINT TOKEN >> ' + this.urlpath.confirmtokenid);


  this._authservice.userActivation(this.urlpath.confirmtokenid).subscribe(
    data => {
      this.apiresponse = data;
      console.log('adfas>> ' + JSON.stringify(this.apiresponse));
      console.log('sdsd>>>>>>' + this.apiresponse.message);

      if (this.apiresponse.message === 'SUCCESS') {
        this.activationstatusmsg = 'Account Activation Successful';
        console.log('success');
      } else if (this.apiresponse.message === 'FAILURE') {
        this.activationstatusmsg = 'Oops! Something went wrong in Activation. Activation Failed.';
        console.log('failure');
      }


  },
    error => console.error(error)
);


  }

}

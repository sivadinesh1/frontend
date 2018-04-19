import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonApiService } from '../../../services/common-api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  urlpath: { userid: string };

  paramsSubscription: Subscription;
  user:any;

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

  }

}

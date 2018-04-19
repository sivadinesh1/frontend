import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { CommonApiService } from './common-api.service';
import { DashboardApiService } from './dashboard-api.service';

@Injectable()
export class SeekerDashboardResolver implements Resolve<any> {

  assessmenttemp: any;

  constructor(private _dashboardApiService: DashboardApiService,) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    // this works too
    //console.log('RESOLVE >> '+ route.url[1].path);

    console.log('WTF>>'+ route.paramMap.get('userid'));

    return this._dashboardApiService.getSeekerById(route.paramMap.get('userid'));

   
    
  }

 

}
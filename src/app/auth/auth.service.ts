import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
    backendUrl = environment.backendUrl;

    isUserLoggedIn: boolean = false;
  
    isCurrentUserSubject:BehaviorSubject<string> = new BehaviorSubject<string>(this.getcurrentuser1());

    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    isFBLogin = new BehaviorSubject<boolean>(this.hasToken());
    isGPLogin = new BehaviorSubject<boolean>(this.hasToken());

    userRole:BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserRole());

    constructor(private _httpclient: HttpClient) {}


    setUserLoggedIn() {
        console.log('is in userlogged in set');
        this.isUserLoggedIn = true;
    }

    setUserLoggedOut() {
        console.log('is in userlogged OUT set');
        this.isUserLoggedIn = false;
    }

    getUserLoggedIn() {
      return  this.isUserLoggedIn;
    }



    private hasToken() : boolean {
        return !!localStorage.getItem('token');
      }

      private getcurrentuser1() : string {
        return localStorage.getItem('token');
      }

      private getUserRole() : string {
        return localStorage.getItem('userrole');
      }

      isWEBLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable();
      }

      isFBLoggedIn() : Observable<boolean> {
        return this.isFBLogin.asObservable();
      }

      isGPLoggedIn() : Observable<boolean> {
        return this.isGPLogin.asObservable();
      }

      getCurrentUser() : Observable<string> {
          return this.isCurrentUserSubject.asObservable();
      }

      getRoleType() : Observable<string> {
        return this.userRole.asObservable();
    }

    emailsignup(emailsignup: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignup/', emailsignup);
     
    }

    
    emailsignin(emailsignin: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignin/', emailsignin);
       
    }

    
    
    fbsignup(fbsignup: any) {
        console.log(JSON.stringify(fbsignup));
        return this._httpclient.post(this.backendUrl + '/api/fbsignup/', fbsignup);
    }

    gpsignup(gpsignup: any) {

        return this._httpclient.post(this.backendUrl + '/api/gpsignup/', gpsignup);
    }

    emailsignin1(username: string, password: string) {
        let url = this.backendUrl + "/index";
        let params = 'username='+username+'&password='+password;
        let httpheaders = new HttpHeaders(
            {
            'Content-Type': 'application/x-www-form-urlencoded'
            });

        return this._httpclient.post(url, params, {headers: httpheaders, withCredentials : true});
    
    }    


    recoverauth(recoverauth:string) {
        return this._httpclient.post(this.backendUrl + '/api/recoverpass/', recoverauth);
    }


    logout() {
        let url = this.backendUrl + "/logout";
        return this._httpclient.get(url, {withCredentials: true});	
    }

    // getUserLoggedIn() {
    //     return false;
    // }


}
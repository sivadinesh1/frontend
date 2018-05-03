import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
    backendUrl = environment.backendUrl;


    private checklogin =  new BehaviorSubject<boolean>(false);
    cast = this.checklogin.asObservable();

    private profilelogged = new BehaviorSubject<string>('');
    profilecast = this.profilelogged.asObservable();

    private rolelogged = new BehaviorSubject<string>('');
    rolecast = this.rolelogged.asObservable();

    isUserLoggedIn = false;

    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    userRole: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserRole());

    constructor(private _httpclient: HttpClient) {}

    setLoginTrue() {
        console.log('is in userlogged in set XXX');
       this.checklogin.next(true);
    }


    setUserLoggedIn() {
        console.log('is in userlogged in set');
        this.isUserLoggedIn = true;
    }

    setUserLoggedOut() {
        console.log('is in userlogged OUT set');
        this.isUserLoggedIn = false;
    }

    getUserLoggedIn() {
      return  this.isUserLoggedIn || this.hasToken();
    }

    setProfileLogged(profileid: string) {
        this.profilelogged.next(profileid);
    }

    setRoleLogged(roletype: string) {
        this.rolelogged.next(roletype);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
      }

      private getcurrentuser1(): string {
        return localStorage.getItem('token');
      }

      private getUserRole(): string {
        return localStorage.getItem('userrole');
      }

      isWEBLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
      }

      getRoleType(): Observable<string> {
        return this.userRole.asObservable();
    }

    emailsignup(emailsignup: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignup/', emailsignup);
    }

    emailsignin(emailsignin: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignin/', emailsignin);
    }

 
    emailsignin1(username: string, password: string) {
        const url = this.backendUrl + '/index';
        const params = 'username=' + username + '&password=' + password;
        const httpheaders = new HttpHeaders(
            {
            'Content-Type': 'application/x-www-form-urlencoded'
            });

        return this._httpclient.post(url, params, {headers: httpheaders, withCredentials : true});
    }

    recoverauth(recoverauth: string) {
        return this._httpclient.post(this.backendUrl + '/api/recoverpass/', recoverauth);
    }

    recoverPassforProfile(email: string, profile: string) {
        return this._httpclient.post(this.backendUrl + '/api/recoverpass/' + email + '/' + profile, {observe: 'response'} );
    }

    logout() {
        const url = this.backendUrl + '/logout';
        return this._httpclient.get(url, {withCredentials: true});
    }

    register(registerform: any) {
        return this._httpclient.post(this.backendUrl + '/api/register', registerform);
    }

    sendOTP(mobilenumber: any) {
        return this._httpclient.post(this.backendUrl + '/api/sendotp/', mobilenumber, {observe: 'response'});
    }

    verifyOTP(otpsessionid: any, enteredotp: any) {
        return this._httpclient.post(this.backendUrl + '/api/verifyotp/' + otpsessionid + '/' + enteredotp,  {observe: 'response'});
    }

    userActivation(confirmtoken: any) {
        return this._httpclient.post(this.backendUrl + '/api/useractivation/' + confirmtoken , {observe: 'response'});
    }

    changePassword(password: any, userid: string) {
        return this._httpclient.post(this.backendUrl + '/api/changepassword/' + password + '/' + userid, {observe: 'response'});
    }

}

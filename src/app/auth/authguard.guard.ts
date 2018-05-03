import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(private _authservice: AuthService, private _router: Router, ) { }


    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {

        if (this._authservice.getUserLoggedIn()) {
          this._authservice.setLoginTrue();
            return true;
        } else {
            this._router.navigate(['/']);
            console.log('NOT LOGGED IN..' + this._authservice.getUserLoggedIn());
        }

  }

}




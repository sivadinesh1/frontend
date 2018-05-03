import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonApiService } from '../../services/common-api.service';
import {MatDialog, MAT_DIALOG_DATA, MatMenuTrigger} from '@angular/material';
import { SignindialogueComponent } from '../../auth/signindialogue/signindialogue.component';
import { SignupdialogueComponent } from '../../auth/signupdialogue/signupdialogue.component';
import { VideodialogueComponent } from '../../auth/videodialogue/videodialogue.component';
import { HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

declare let $: any;

@HostListener('window:scroll', [])

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
public isScrolled = false;
stickyheader = true;

isLoggedIn = false;

profilelogged = '';
rolelogged = '';

  constructor(public dialog: MatDialog, private _router: Router,
    private _authservice: AuthService,
    @Inject(DOCUMENT) private document: any) {

      this._authservice.cast.subscribe(data => {
        this.isLoggedIn = data;
        console.log('is logged in @@@@>> ' + this.isLoggedIn);
      });
      console.log('is logged in >> ' + this.isLoggedIn);

      this._authservice.profilecast.subscribe(data => {
        this.profilelogged = data;
        console.log('is profile in @@@@>> ' + this.profilelogged);
      });

      this._authservice.rolecast.subscribe(data => {
        this.rolelogged = data;
        console.log('is profile in @@@@>> ' + this.rolelogged);
      });


    }

  ngOnInit() {
    if (this._authservice.getUserLoggedIn()) {
      this._authservice.setLoginTrue();
      this.isLoggedIn = true;
      this.profilelogged = localStorage.getItem('profilelogged');
      this.rolelogged = localStorage.getItem('rolelogged');

    } else {
        this.isLoggedIn = false;
    }
    const page = localStorage.getItem('currentpage');
    console.log('HIGHLIGH >>> ' + page);
  }

  @HostListener('window:scroll', [])
onWindowScroll() {
    const number = window.scrollY;
    const headerOffset = document.getElementById('myHeader').offsetTop;

    const page = localStorage.getItem('currentpage');
    console.log('HIGHLIGH >>> ' + page);

    if (number > 100 && page === 'home') {
      $('#myHeader').css('sticky' );
      $('.logo').css({'display': 'grid' });
      $('.sticky').css({'grid-template-columns': '1fr 1fr 3fr 1fr 2fr' });
      this.stickyheader = true;

    } else if (number < 100 && page === 'home') {
      $('.logo').css({'display': 'none' });
      $('.sticky').css({'grid-template-columns': '2fr 4fr 1fr 3fr' });
    }
}

  signinDialog() {
    this.dialog.open(SignindialogueComponent);
  }

  signupDialog() {
    this.dialog.open(SignupdialogueComponent);
  }

  signout() {

    localStorage.clear();
    this._authservice.setUserLoggedOut();
    this._authservice.setProfileLogged('');
    this._authservice.setRoleLogged('');
    this.isLoggedIn = false;
  }

}

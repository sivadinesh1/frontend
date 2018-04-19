import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonApiService } from '../../services/common-api.service';
import {MatDialog, MAT_DIALOG_DATA, MatMenuTrigger} from '@angular/material';
import { SignindialogueComponent } from '../../auth/signindialogue/signindialogue.component';
import { SignupdialogueComponent } from '../../auth/signupdialogue/signupdialogue.component';
import { VideodialogueComponent } from '../../auth/videodialogue/videodialogue.component';
import { HostListener} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

declare let $ : any;

@HostListener("window:scroll", [])

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
public isScrolled = false;
stickyheader:boolean = false;

isLoggedIn:boolean = false; 

  constructor(public dialog: MatDialog, private _router: Router,
    private _authservice: AuthService, 
    @Inject(DOCUMENT) private document: any) { 
      
   
      console.log('is logged in >> ' + this.isLoggedIn);
    }

  ngOnInit() {
    this._authservice.cast.subscribe(data => {
      this.isLoggedIn = data;
      console.log('is logged in @@@@>> ' + this.isLoggedIn);
    }) 
  }

  @HostListener('window:scroll', [])
onWindowScroll() {
    const number = window.scrollY;
    var headerOffset = document.getElementById("myHeader").offsetTop;

    let page = localStorage.getItem("currentpage");
    console.log('HIGHLIGH >>> ' + page);

    if (number > 100 && page=='home') {
      $('#myHeader').css('sticky' );
      $('.logo').css({'display':'grid' });
      $('.header').css({'grid-template-columns':'1fr 1.5fr 2fr 1fr 2fr' });
      this.stickyheader = true;
      
   } else if (page!='home') {
      $('#myHeader').css('sticky' );
      $('.logo').css({'display':'grid' });
      $('.header').css({'grid-template-columns':'1fr 1.5fr 2fr 1fr 2fr' });
      this.stickyheader = true;
     
  } else if(number < 100 && page=='home') {
      $('.logo').css({'display':'none' });
      $('.header').css({'grid-template-columns':'2fr 2fr 1.75fr 2fr' });
      this.stickyheader = false;
      
  } 
    
    // if (number > 100 && page=='home') {
    //     $('#myHeader').css('sticky' );
    //     $('.logo').css({'display':'grid' });
    //     $('.header').css({'grid-template-columns':'1fr 1.5fr 2fr 1fr 2fr' });
    //     this.stickyheader = true;
        
    //  } else if (page!='home') {
    //     $('#myHeader').css('sticky' );
    //     $('.logo').css({'display':'grid' });
    //     $('.header').css({'grid-template-columns':'1fr 1.5fr 2fr 1fr 2fr' });
    //     this.stickyheader = true;
       
    // } else {
    //     $('.logo').css({'display':'none' });
    //     $('.header').css({'grid-template-columns':'2fr 2fr 1.75fr 2fr' });
    //     this.stickyheader = false;
        
    // }
    
}
 
  signinDialog() {
    this.dialog.open(SignindialogueComponent, {
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

  

}



// **

// ngOnInit() {
//   $(function () {
//     $('.parallax').parallax();
//     var height = $(window).height();

//     $('#container').css({ 'height': height + 'px' });


//   }); // end of document ready

//   this.currentUrl = this._router.url;
// }
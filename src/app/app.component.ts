import { Component, HostListener, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

declare let webGlObject: any;
declare let $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SkillmaTic';

  constructor(private _router: Router, @Inject(DOCUMENT) private document: any) { 
    console.log('where r u from >> ' + window.location.hostname);
  }

public isScrolled = false;

// @HostListener('window:scroll', [])
// onWindowScroll() {
//     const number = window.scrollY;
//     var headerOffset = document.getElementById("myHeader").offsetTop;

//     console.log('header val >> ' + headerOffset);
//     console.log('abcd >> ' + number);

//     if (number > 93) {
//         this.isScrolled = true; 
//     } else {
//         this.isScrolled = false;
//     }
//     console.log('wft'+this.isScrolled);
// }




  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this._router.navigated = false;
          window.scrollTo(0, 0);
      }
  });
    webGlObject.init();
  }

  
}

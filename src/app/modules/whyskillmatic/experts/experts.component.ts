import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { VideodialogueComponent } from '../../../auth/videodialogue/videodialogue.component';
import { ExpertsVideoComponent } from './experts-video/experts-video.component';
import { SignupdialogueComponent } from '../../../auth/signupdialogue/signupdialogue.component';
declare let $ : any;
@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.css', '../whyskillmatic.component.css']
})
export class ExpertsComponent implements OnInit {

  
  constructor(private _titleService: Title,  public dialog: MatDialog,) { }

  ngOnInit() {
   

    
    $('.slider').slider();
    this._titleService.setTitle('Why SkillmaTic - Experts');


    var headerOffset = document.getElementById("myHeader").offsetTop;
    
          $('#myHeader').css('sticky' );
          $('.logo').css({'display':'grid' });
    
          $('.header').css({'grid-template-columns':'1fr 1.5fr 2fr 2fr 1fr' });
    
          
         
  }

  videoDialog() {
    this.dialog.open(ExpertsVideoComponent, {
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

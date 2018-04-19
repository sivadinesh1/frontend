import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { VideodialogueComponent } from '../../../auth/videodialogue/videodialogue.component';
import { IndustryVideoComponent } from './industry-video/industry-video.component';
import { SignupdialogueComponent } from '../../../auth/signupdialogue/signupdialogue.component';
declare let $ : any;
@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css', '../whyskillmatic.component.css']
})
export class IndustryComponent implements OnInit {

  
  constructor(private _titleService: Title,  public dialog: MatDialog,) { }

  ngOnInit() {
   

    
    $('.slider').slider();
    this._titleService.setTitle('Why SkillmaTic - Industry');
         
  }

  videoDialog() {
    this.dialog.open(IndustryVideoComponent, {
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


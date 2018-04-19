import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { VideodialogueComponent } from '../../../auth/videodialogue/videodialogue.component';
import { UniversityVideoComponent } from './university-video/university-video.component';
import { SignupdialogueComponent } from '../../../auth/signupdialogue/signupdialogue.component';
declare let $ : any;
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css', '../whyskillmatic.component.css']
})
export class UniversityComponent implements OnInit {

  
  constructor(private _titleService: Title, public dialog: MatDialog,) { }

  ngOnInit() {
   

    
    $('.slider').slider();
    this._titleService.setTitle('Why SkillmaTic - Universities');
         
  }

  videoDialog() {
    this.dialog.open(UniversityVideoComponent, {
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

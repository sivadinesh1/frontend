import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { VideodialogueComponent } from '../../../auth/videodialogue/videodialogue.component';
import { SignupdialogueComponent } from '../../../auth/signupdialogue/signupdialogue.component';
declare let $ : any;

@Component({
  selector: 'app-seekers',
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css', '../whyskillmatic.component.css']
})
export class SeekersComponent implements OnInit {

  constructor(private _titleService: Title,  public dialog: MatDialog,) { }

  ngOnInit() {
   
    
    
    $('.slider').slider();
    this._titleService.setTitle('Why SkillmaTic - Seekers');
         
  }

  videoDialog() {
    this.dialog.open(VideodialogueComponent, {
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

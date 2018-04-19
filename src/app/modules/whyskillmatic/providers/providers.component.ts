import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { VideodialogueComponent } from '../../../auth/videodialogue/videodialogue.component';
import { ProviderVideoComponent } from './provider-video/provider-video.component';
import { SignupdialogueComponent } from '../../../auth/signupdialogue/signupdialogue.component';
declare let $ : any;
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css', '../whyskillmatic.component.css']
})
export class ProvidersComponent implements OnInit {

  
  constructor(private _titleService: Title, public dialog: MatDialog,) { }

  ngOnInit() {
   

    
    $('.slider').slider();
    this._titleService.setTitle('Why SkillmaTic - Providers');
         
  }

  videoDialog() {
    this.dialog.open(ProviderVideoComponent, {
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

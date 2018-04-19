import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private _titleService: Title) { 
  
   
  }

  ngOnInit() {
    localStorage.setItem('currentpage','');
    console.log('about us called');
   
    this._titleService.setTitle('SkillmaTic - Abouts Us Page');
  }

}

import { Component, OnInit } from '@angular/core';




declare var $: any;

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    // $('.parallax').parallax();
    $('body').append('<p>Hello World!</p>');
      
  }

  ngAfterViewInit() {
    

    $('.dropdown-trigger').dropdown({
      hover: true,
    });

    $('.dropdown-button2').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: ($('.dropdown-content').width()*3)/2.5 + 5, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

  
  }
 
}

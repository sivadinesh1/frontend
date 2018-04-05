import { Component } from '@angular/core';

declare let webGlObject: any;
declare let $ : any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SkillmaTic';

  ngOnInit() {
    webGlObject.init();
  }

  
}

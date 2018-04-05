import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../services/common-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _commonapiservice: CommonApiService) { }

  ngOnInit() {

    this._commonapiservice.getCourses()      
    .subscribe(
      data => {    
        console.log('KKKK >> '+ JSON.stringify(data));
      },
            error => console.error(error)
    );
    
  }

}

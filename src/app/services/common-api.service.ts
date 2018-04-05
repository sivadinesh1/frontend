import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class CommonApiService {
  backendUrl = environment.backendUrl;
  

  constructor(private _httpClient: HttpClient) { }
  


  getCourses() {
    return this._httpClient.get(this.backendUrl + '/api/getcourses/');

}  




}



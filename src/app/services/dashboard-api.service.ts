import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class DashboardApiService {
  backendUrl = environment.backendUrl;
  

  constructor(private _httpClient: HttpClient) { }
  
    getSeekerById(userid:any) {
        return this._httpClient.get(this.backendUrl + '/api/getseekerbyid/'+userid);
    }

  

  

}



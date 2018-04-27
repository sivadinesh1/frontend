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

  getInstitutions() {
    return this._httpClient.get(this.backendUrl + '/api/getallinstitutions/');
  }


  updateProfileUser(updateUser: any) {
    return this._httpClient.post(this.backendUrl + '/api/edit/profile/', updateUser, {observe: 'response'});
  }

  addprofilepic(id: string, formData, headers: HttpHeaders) {
    const params = new HttpParams().set('userid', id);
    return this._httpClient.post(this.backendUrl + '/api/profilepicupload', formData , { headers, params}  );
  }
  
  addResume(id: string, formData, headers: HttpHeaders) {
    const params = new HttpParams().set('userid', id);
    console.log('calling api');
    return this._httpClient.post(this.backendUrl + '/api/resumeupload', formData , { headers, params}  );
  }
}



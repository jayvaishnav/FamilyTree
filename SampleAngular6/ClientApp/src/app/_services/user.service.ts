import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions} from '@angular/http';
import { AppConfig } from '../app.config';
import { User } from '../_models/User';
import { RequestOptionService } from './requestoption.service';
import { map } from 'rxjs-compat/operator/map';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private requestOptionService: RequestOptionService,
    private http: HttpClient,
    private config: AppConfig) { }
  
  //Get User Info by UserId
  getById(id: number) {
    
    return this.http.get<any>(this.config.apiUrl + '/users/' + id);
     
    //return this.http.get(this.config.apiUrl + '/users/' + id, this.requestOptionService.jwt())
    //  .map((response: Response) => response.json());
  }  

  
}

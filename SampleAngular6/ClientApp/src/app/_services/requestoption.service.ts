import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable,Subject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class RequestOptionService { 
  
  constructor(private http: Http) {
    
  }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // create authorization header with jwt token
  jwt() {

    if (this.currentUser && this.currentUser.token) {
      //let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.token });
      return new HttpHeaders().append('Authorization', 'Bearer ' + this.currentUser.token);
    }
  }
  

}

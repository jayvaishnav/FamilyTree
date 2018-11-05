import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConfig } from '../app.config';
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient,
    private config: AppConfig) { }

  //Login with username/password and get JWT Token
  login(username: string, password: string) {


    return this.http.post<any>(this.config.apiUrl + '/users/authenticate', { "Username": username, "Password": password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        debugger;
        return user;
      }));

    

    //return this.http.post(this.config.apiUrl + '/users/authenticate', {
    //  "Username": username, "Password": password })
    //  .map((response: HttpResponse) => {
    //    // login successful if there's a jwt token in the response
    //    let user = response.json();
    //    if (user && user.token) {
    //      // store user details and jwt token in local storage to keep user logged in between page refreshes
    //      localStorage.setItem('currentUser', JSON.stringify(user));
    //    }
    //  });
  }

  get isLoggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return new BehaviorSubject<boolean>(true);
    }
    return new BehaviorSubject<boolean>(false);
  }


  logout() {
    // remove user from local storage to log user out
    debugger;
    localStorage.removeItem('currentUser');
  }
}

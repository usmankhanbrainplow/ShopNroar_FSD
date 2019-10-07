import { Injectable,  Inject, PLATFORM_ID  } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { isPlatformBrowser } from '@angular/common';
import {AppServices} from '../app.services';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class AuthenticationService {
  private url = environment.apiUrl;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private httpserive:AppServices,private http: Http) { }
  loginID(query:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url+'user/getID/'+query,{headers: headers}).map(response => response.json());


  }
  userProfile(query:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url+'user/getprofile/'+query,{headers: headers}).map(response => response.json());


  }

  isUserAuthenticated(username:any) {
    return this.http.post(this.url+'user/isvarified/',{
      "username":username
    }).map((response: Response) => response.json());
  }

  resendAuthentication(username:any) {
    return this.http.post(this.url+'user/resendAuthentication/',{
      "username":username
    }).map((response: Response) => response.json());
  }

  UpdateProfile(model:any) {
      // alert(model['first_name'])
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url+'user/updateprofile/', JSON.stringify(model),
      {headers: headers}).map((response: Response) => response);


  }

  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+'user/user-token-auth/',
      { username: username, password: password }, {headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user =  { username: username, token: response.json().token};

        if (user && user.token) {

          if (isPlatformBrowser(this.platformId)) {

            localStorage.setItem('currentUser', JSON.stringify(user));
            //     // console.log(user)
          }
        }
      });
  }





  googlelogin() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url+'oauth/login/google-oauth2/',{headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        alert(response)


      });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {

      // remove user from local storage to log user out
      localStorage.removeItem('User');
      localStorage.removeItem('token');

      localStorage.removeItem('currentUser');
      return this.http.get(this.url+'user/api-token-refresh').map(response => response.json());
    }

    }
}

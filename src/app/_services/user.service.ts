import {Injectable, PLATFORM_ID , Inject} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppServices} from '../app.services';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class UserService {
  private url = environment.apiUrl;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpserive: AppServices, private http: Http, private router: Router,) {
  }
  id: any;

  //
  // getAll() {
  //   return this.http.get(this.url+'users/', this.jwt()).map((response: Response) => response.json());
  // }
  //
  // getById(id: number) {
  //   return this.http.get(this.url+'users/' + id, this.jwt()).map((response: Response) => response.json());
  // }


  verifyAccountEmail(verification:any) {
    return this.http.post(this.url+'user/verifyAccount/',{
      "verification":verification
    }).map((response: Response) => response.json());
  }


  verify_username(username: string) {

    return this.http.get(this.url+'user/verifyusername/' + username)
      .pipe(
      tap( // Log the result or error
        data => {
          if (data) {
            if (data.status === 201 || data.status === 200) {
              const response_useradmin = data.json();
              return response_useradmin;
            }
          }
        }
        ,
        error => {
          if (error.status !== 404) {
            if (error.status === 401) {
              return Observable.throw(new Error(error.status));
            }
          } else {
            return Observable.throw(new Error(error.status));
          }
        }
        ))

  }


  check_email_unique(email: any) {
    return this.http.get(this.url+'user/email_verify/' + email).map((response: Response) => response.json());
  }


  create(user: any) {
      let headers = new Headers();

        headers.append('Content-Type', 'application/json');

    return this.http.post(this.url+'user/users/', {

      "first_name": user.first_name,
      "last_name": user.last_name,
      "username": user.username,
      "password": user.password,
      "email": user.email,
      "Mobile":"11111111111",
      "newsLetter":user.newsLetter


  },
      {headers: headers})
      .map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200) {
          // localStorage.setItem('account_created' , '1' );
          const responce_data = res.json();
          if (isPlatformBrowser(this.platformId)) {
            this.id = localStorage.setItem('id', responce_data.id);
          } else {
            this.id = 0
          }

          user.id = responce_data.id;
          // this.register_customerDetails(user).subscribe();
        }

      }
    }).pipe(
      catchError((error: any) => {
      if (error.status !== 404) {
        if (error.status === 401) {

          return Observable.throw(new Error(error.status));
        }


      } else {
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    }

      )

    )
  }

  register_customerDetails(model: any) {
// console.log(model);
    return this.http.post(this.url+'user/usersDetails/',
      {
        'user_id': model.id,
        'email': model.email,
        'newsLetter': model.newsLetter,
        'Mobile': "00"
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          // console.log('ok submited');
        }
        else {

        }
      }
    }).pipe(catchError((error: any) => {
      if (error.status !== 404) {
        if (error.status === 401) {

          return Observable.throw(new Error(error.status));
        }


      } else {
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    })
    )

  }
  //
  // update(user: User) {
  //   return this.http.put('https://influexpapi.herokuapp.com/users/'
  //     + user.id, user, this.jwt()).map((response: Response) => response.json());
  // }

  // delete(id: number) {
  //   return this.http.delete('https://influexpapi.herokuapp.com/users/' + id, this.jwt()).map((response: Response) => response.json());
  // }

  // private helper methods

  // private jwt() {
  //   // create authorization header with jwt token
  //   if (isPlatformBrowser(this.platformId)) {
  //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //     if (currentUser && currentUser.token) {
  //       const headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
  //       return new RequestOptions({headers: headers});
  //     }
  //   }
  //
  // }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT token' })
};
@Injectable({
  providedIn: 'root'
})
export class AppServices {

  private url = 'https://backend.shopnroar.com/';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



  //-------------All Categories API-------------//

  getProductSubCategories(){
    return this.http.get(this.url+ 'products/GetAllCategories').pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }

  getHomeData(){
    return this.http.get(this.url+ 'products/Home_Test/').pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }




  //-------------All Merchants Name API-------------//

  getdealsBrands() {
    return this.http.get(this.url + 'products/merchantlogos/').pipe(
      // tap(_ => console.log('Data is' )),
      catchError(err => err )
    );
  }



  //-------------Hot Deals API-------------//

  getTop3hotdeals(page: any) {
    return this.http.get(this.url + 'products/todayTop3hotdeals?page=' + page).pipe(
      // tap(_ => console.log('Data is' )),
      catchError(err => err )
    );
  }



  //-------------Recently Search Items API-------------//

  searchGeneric(query: string, lower: any, upper: any, brand: any, merchant: any, category: any, page: any) {

    return this.http.get(this.url + 'search/filterallproducts/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant + '/' + category + '/?page=' + page).pipe(
      tap( // Log the result or error
        data => console.log('Dataaa', data),
        error => console.log('Errorrrr', error)
      ),
      catchError(err => err )
    );
  }

  getpopular(page: any) {

    return this.http.get(this.url + 'trend/popular?page=' + page).pipe(
      // tap(_ => console.log('Data is' )),
      catchError(err => err )
    );

  }

  getdealsCategory(name: any) {

    return this.http.get(this.url + 'products/getVendorCategories/' + name).pipe(
      tap( // Log the result or error
        data => console.log('Dataaa', data),
        error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );

  }

  // DealsFilters(name: any , page: any , count: any , low: any , high: any, catname: any, sort) {
  //
  //   // console.log('Urllllllll', this.url + 'products/filterVendorDeals/'+name+'/'+'?page='+page+'&count='+count+'&price1='+low +'&price2='+high+'&category='+catname+'&sort='+sort)
  //
  //   return this.http.get(this.url + 'products/filterVendorDeals/'+name+'/'+'?page='+page+'&count='+count+'&price1='+low +'&price2='+high+'&category='+catname+'&sort='+sort).pipe(
  //     tap( // Log the result or error
  //       data => console.log('Dataaa', data),
  //       error => console.log('Errorrrr', error)
  //     ),
  //     catchError(this.handleError)
  //   );
  //
  // }


  getTrendsToy(page: any, preloaderType: any) {

    return this.http.get(this.url + 'trend/getTrendstoys?page=' + page, null).pipe(
      tap( // Log the result or error
        data => console.log('Dataaa', data),
        error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );

  }

  Add_Subscriber(email: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'user/subscribers/add', {
        "email": email,
        "isSend": "false"
      },

      {headers: headers}).map((response: Response) => {
        response.json()
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          //alert("good")

        }

      }
    ).catch((error: any) => {
      console.log(error);

      if (error.status !== 404) {
        if (error.status === 400) {
          //alert("Email already exists")

        }
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });


  }



  //-------------Recommendations API-------------//

  ProductsComparison(query: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterproductComparison/' + query ).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        error => console.log('Errorrrr', error)
      ),
      catchError(err => err )
    );

  }

  //-------------ProductsByCategories API-------------//

  FilterProductsbyCategory(query: string, count:any,low:any,high:any, brand:any,merchant:any,sub:any, page: any, sort:any, preloaderType: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log('urllll',this.url + 'products/categoryByID/' + query + '?count='+count+'&low='+low+'&high='+high+'&brand='+brand+'&merchant='+merchant+'&sub='+sub+'&page=' + page + '&sort=' + sort, null )
    return this.http.get(this.url + 'products/categoryByID1/' + query + '?count='+count+'&low='+low+'&high='+high+'&brand='+brand+'&merchant='+merchant+'&sub='+sub+'&page=' + page + '&sort=' + sort).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );

  }


  FilterProductsofElectronics(query: string,) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log('urllll',this.url + 'products/categoryByID/' + query + '?count='+count+'&low='+low+'&high='+high+'&brand='+brand+'&merchant='+merchant+'&sub='+sub+'&page=' + page + '&sort=' + sort, null )
    return this.http.get(this.url + 'products/category_Home/' + query).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );

  }

  //-------------SubCategoriesByCategories API-------------//

  getFilteredSubCats(category:any) {

    return this.http.get(this.url + 'products/GetSubCategoryofCategory/'+category).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );

  }

//-------------ProductsBySubCategories API-------------//


  FilterProductsbySubCategory(query: string, query2: string, count:any,low:any,high:any, brand:any,merchant:any,sub:any, page: any, preloaderType: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // console.log('URL is..........',this.url + 'products/subCategoryByID/' + '166' +'/'+ '1604' + '?count='+count+'&low='+low+'&high='+high+'&brand='+brand+'&merchant='+merchant+'&sub='+sub+'&page=' + page, null,)
    return this.http.get(this.url + 'products/subCategoryByID/' + query +'/'+ query2 + '?count='+count+'&low='+low+'&high='+high+'&brand='+brand+'&merchant='+merchant+'&sub='+sub+'&page=' + page, {headers:headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );
  }

  //-------------Login Authorization API-------------//

  Add_link(email: string, link: any) {
    let headers =  new HttpHeaders({'Authorization':'JWT'});
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'user/reset/', {
      "email": email,
      "link": link,
      "isValid": false,
      "Code": null,

    }, {headers: headers}).pipe(
      tap( // Log the result or error
        data => data,
        error =>  error

      ),
      catchError(this.handleError)
    );


  }

  //-------------Deals By Merchants API-------------//

  Filterdealsbybrand(query: string, pagecount:any, page: any, preloaderType: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url + 'products/filtertodaydealsbybrand/' + query + '/' + '?count='+pagecount+'&page=' + page).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );

  }

  getdailydeals(page: any,count) {
    return this.http.get(this.url + 'products/todaydeals?count='+count+'&page=' + page).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );
  }


  AddtoWatchlist(id: any) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
    let token = currentUser.token; // your token
    const headers =  new HttpHeaders({'Authorization': ' JWT '+ token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'feedback/addwishlist/' + id, {headers:headers}).pipe(
      tap( // Log the result or error
      ),
      catchError(this.handleError)
    );
  }

//-------------Add Feedback API (Contact page)-------------//

  Add_Feedback(name: string, email: string, title: string, feedback: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'feedback/add', {
        "SNR_FullName": name,
        "SNR_Email": email,
        "SNR_Subject": title,
        "SNR_Feedback": feedback,
      },

      {headers: headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );


  }
//-------------All Deals API-------------//

  gethotdeals(page: any,sort:any) {
    return this.http.get(this.url + 'products/todayhotdeals?page=' + page + '&sort=' + sort).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }

  Getfilterdeals(name: any , count: any, page : any , cat: any, minprice:any, maxprice:any, sort:any, search:any) {
    // let headers =  new HttpHeaders({'Authorization':'JWT'});
    // headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'products/filterVendorDeals_test/' + name + '/' + count + '/' + '?page=' + page, {
      cat:cat,
      minprice:minprice,
      maxprice:maxprice,
      sort:sort,
      search:search
    }).pipe(
      tap( // Log the result or error
        data => data,
        error =>  error
      ),
      catchError(this.handleError)
    );
  }

  GetSearchResults(count: any, query: any, minprice:any, maxprice:any, merchant:any, sort:any ) {
    // let headers =  new HttpHeaders({'Authorization':'JWT'});
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'search/mainsearch/' + count + '/', {
      query:query,
      minprice:minprice,
      maxprice:maxprice,
      merchant:merchant,
      sort:sort,
    }).pipe(
      tap( // Log the result or error
        data => data,
        error =>  error
      ),
      catchError(this.handleError)
    );
  }

  checkpasswordExistence(username: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'user/verifypassword/',
      {username: username, password: password}, {headers: headers})
      .pipe(
        tap( // Log the result or error
          // data => console.log('Dataaa', data),
          // error => console.log('Errorrrr', error)
        ),
        catchError(this.handleError)
      );
  }

  UpdatePasswordmanually(username: any, password: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'user/updatepasswordmanually/', {
        username: username,
        password: password
      },
      {headers: headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }

  // getTrendsGame(page: any, preloaderType: any) {
  //
  //   return this.http.get(this.url + 'trend/getTrendsgame?page=' + page).pipe(
  //     tap( // Log the result or error
  //       // data => console.log('Dataaa', data),
  //       // error => console.log('Errorrrr', error)
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  searchGenericASC(query: string, lower: any, upper: any, brand: any, merchant: any,category:any,count:any, page: any, preloaderType: any) {
    // alert(query)
    let headers = new Headers();
    // console.log(lower)
    // console.log(upper)
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterallproductsASC/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category + '/?count='+count+'&page=' + page, null).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }

  searchGenericDESC(query: string, lower: any, upper: any, brand: any, merchant: any,category:any, count:any, page: any, preloaderType: any) {
    let headers = new Headers();
    // console.log(lower)
    // console.log(upper)
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterallproductsDESC/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category  + '/?count='+count+'&page=' + page, null).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)
      ),
      catchError(this.handleError)
    );
  }

  sendLinkMail(email: string, link: string) {
    return this.http.post(this.url + 'user/email/',
      {
        'email': email,
        'sharedlink': link
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          // console.log('ok submited');
        }
        else {
          console.log(res.status)
        }
      }
    }).catch((error: any) => {
      console.log(error);
      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);
          return Observable.throw(new Error(error.status));
        }
      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);
        return Observable.throw(new Error(error.status));
      }
    });
  }


  searchGenericexact(query: string, lower: any, upper: any, brand: any, merchant: any,category:any,count:any, page: any, preloaderType: any) {

    // console.log(query)
    let headers = new HttpHeaders();

    // console.log(lower)
    // console.log(upper)
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterallproductsexact/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category  + '/?count='+count+'&page=' + page,{headers:headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );

  }


  Add_Review(user: string, pid: string, star: any, title: string,  review: string, ) {
    // console.log(user)
    // console.log(pid)
    // console.log(star)
    // console.log(title)
    // console.log(review)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'products/addreview/', {
        "SNR_Review_Title":title,
        "SNR_Review_Author" :user,
        "SNR_Review_Body" : review,
        "SNR_Review_Stars" :star,
        "Product" : pid
      },
      {headers: headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );


  }

  getProductByID(id: any) {

    return this.http.get(this.url + 'products/singleproduct1/' + id).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );

  }

  CheckWishList(Purl:any){
    return this.http.post(this.url + 'feedback/checkwishlist',{
      'SNR_ProductURL': Purl
    }).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );
  }


  Addwishlist(data: any) {
    var UserID = JSON.parse(localStorage.getItem('userKey'));

    return this.http.post(this.url + 'feedback/addwishlist', {
      "user": UserID,
      "SNR_SKU": data['SNR_SKU'],
      "SNR_Title": data['SNR_Title'],
      "SNR_ModelNo": data['SNR_ModelNo'],
      "SNR_Brand": data['SNR_Brand'],
      "SNR_UPC": data['SNR_UPC'],
      "SNR_Price": data['SNR_Price'],
      "SNR_ProductURL": data['SNR_ProductURL'],
      "SNR_Available": data['SNR_Available'],
      "SNR_Description": data['SNR_Description'],
      "SNR_ImageURL": data['SNR_ImageURL'],
      "SNR_CustomerReviews": data['SNR_CustomerReviews'],
    }).map((res:Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          // console.log('ok submited',res.json());
          return[{Response:res, json:res.json()}]
        }
        else {
          console.log(res.status)

        }
      }
    }).catch((error: any) => {
      // //alert(error.status);
      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);
          alert('This item is already added in your favourite list')


          return Observable.throw(new Error(error.status));
        }


      }
      if (error.status == 500 || error.status == 501) {
        alert('This item is already added in your favourite list')

      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });

  }
  Unwatch(Purl:any){
    var UserID = JSON.parse(localStorage.getItem('userKey'));
    return this.http.post(this.url + 'feedback/deletewishlistbyuserweb/', {
      "user": UserID,
      'SNR_ProductURL': Purl
    }).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );
  }

  wishlistbyUser(page: any) {
    var UserID = JSON.parse(localStorage.getItem('userKey'));

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url + 'feedback/wishlistbyuser/' + UserID + '/?page=' + page, {headers: headers}).pipe(
      tap( // Log the result or error
        // data => console.log('Dataaa', data),
        // error => console.log('Errorrrr', error)

      ),
      catchError(this.handleError)
    );

  }



}

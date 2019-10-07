import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';

import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import {PagerService} from "../_services/pager.service";
import swal from 'sweetalert';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-wishlistuser',
  templateUrl: './wishlistuser.component.html',
  styleUrls: ['./wishlistuser.component.scss'],


})
export class WishlistuserComponent implements OnInit {
  public products: any
  public Popular: any
  listview = false;
  gridview = true;
  pager:any={};

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              public sgflag: SimpleGlobal,
              private httpService: AppServices, private router: Router,
              private pagerService: PagerService) {
  }

  setPage(page:any) {
    // alert(event)

    this.httpService.wishlistbyUser(page).subscribe(
      data => {
        this.products = data;
        this.pager = this.pagerService.getPager(this.products['totalItems'], page,12);
        console.log(this.products)
      }
    );

  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {

      this.sgflag['login']=false;

      // remove user from local storage to log user out
      var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      var localtoken = currentUser.token; // your token
      // window.open("http://ns519750.ip-158-69-23.net:8005/settings/logout");

      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('type');
      localStorage.removeItem('userKey');
      setTimeout(() => this.router.navigate(['']), 300);
      swal('Successfully Logout from SHOPnROAR','', 'success')

    }
  }

  listviewfun() {
    this.listview = true;
    this.gridview = false;
  }

  gridviewfun() {
    this.listview = false;
    this.gridview = true;
  }


  ngOnInit() {
    // this.httpService.getTrendsGame(1, 'full').subscribe(
    //   data => {
    //
    //
    //     this.Popular = data
    //   }
    // );

    this.httpService.wishlistbyUser(1).subscribe(
      data => {
        this.products = data;
        this.pager = this.pagerService.getPager(this.products['totalItems'], 1,12);
        console.log(this.products)
      }
    );

  }

}

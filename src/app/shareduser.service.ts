import {Injectable, Inject, PLATFORM_ID, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isPlatformBrowser} from '@angular/common';
@Injectable({
  providedIn:'root'
})
export class DataService implements OnInit {


  private userSource: any;
  currentUser: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {

    }
  }

  changeUserData(data: any) {
    this.userSource.next(data);
  }

  ngOnInit() {
    {
      this.userSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.userSource.asObservable();
    }
  }
}

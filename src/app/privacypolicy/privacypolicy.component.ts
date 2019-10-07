import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      window.scrollTo(0, 0)
    }
  }

}

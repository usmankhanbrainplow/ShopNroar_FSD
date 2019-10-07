import { Component, OnInit,Inject, PLATFORM_ID , } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tors',
  templateUrl: './tors.component.html',
  styleUrls: ['./tors.component.scss']
})
export class TorsComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0)
    }
  }

}

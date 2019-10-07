import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-recentlysearch',
  templateUrl: './recentlysearch.component.html',
  styleUrls: ['./recentlysearch.component.css']
})
export class RecentlysearchComponent implements OnInit {
  public RecentlySearch: any = [];
  constructor(private AppService: AppServices) { }


  slideConfig4 = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    prevArrow: '<button class="leftRsBanner"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="rightRsBanner"><i class="fas fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 603,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };


  ngOnInit() {
    this.getRecentlySearchItems();
  }

  getRecentlySearchItems(){
    var searchhistory = localStorage.getItem('searchedItem')
    this.AppService.searchGeneric('Iphone', -1, -1, -1, -1, -1, 1).subscribe(
      data => {
        this.RecentlySearch = data['results'];
        console.log('Recently search itessssssssssssssssss', this.RecentlySearch);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

  public Electronics: any = [];
  filteredbrand: any;
  filteredmerchant: any;
  filteredsub: any;
  CatName: any;
  pagecount = 36;
  lowprice: any;
  highprice: any;
  modelNo = '222';
  sort: any;
  pageno = 1;
  i = 0;


  slideConfig6 = {
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

  constructor(private AppService: AppServices) {
  }

  ngOnInit() {
    this.getElectronicsCategory();
  }

  getElectronicsCategory() {
    this.AppService.getHomeData().subscribe(data => {
      this.Electronics = data['home_Electronics'];

      // console.log('Categories are:', this.Categories);
      // console.log('merchants are:', this.merchants);
    });

  }
}

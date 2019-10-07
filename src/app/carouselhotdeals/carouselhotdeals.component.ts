import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-carouselhotdeals',
  templateUrl: './carouselhotdeals.component.html',
  styleUrls: ['./carouselhotdeals.component.css']
})
export class CarouselhotdealsComponent implements OnInit {

  public products: any = [];

  slideConfig3 = {
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

  constructor(private AppService: AppServices) { }

  ngOnInit() {

    //-------------Hot Deals API-------------//

    this.AppService.getTop3hotdeals(1).subscribe(
      data => {
        this.products = data['results'];
        for(let item of this.products){
          item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
        }
        if(this.products.length > 0) {
        }

      }
    )
  }

}

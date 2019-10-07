import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideConfig = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
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
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 603,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };
  // .......Slide config2.........
  slideConfig2 = {
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
 // .......Slide config3.........
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
 // .......Slide config4.........
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
 // .......Slide config5.........
 slideConfig5 = {
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
  slideConfig9 = {
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
  slideConfig8 = {
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
  slideConfig7 = {
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

  Categories: any = [];
  merchants: any = [];
  Hot_Deals: any = [];
  HomeGarden: any = [];
  HomeHealth: any = [];
  HomeApperel: any = [];
  HomeElectronics: any = [];
  BrandName:any=[];
  public products: any = [];
  public RecentlySearch: any = [];
  public Recommendations: any = [];
  title: 'iphone';
  i=0;

  constructor(private AppService: AppServices) { }

  ngOnInit() {
    // this.getCategories();
    // this.getBrandNames();
    this.HomeData();
    // this.getRecentlySearchItems();
    // this.getRecommendations();


    // this.AppService.getTop3hotdeals(1).subscribe(
    //   data => {
    //     this.products = data['results'];
    //     if(this.products.length > 0) {
    //     }
    //
    //   }
    // );
  }

  HomeData(){
    this.AppService.getHomeData().subscribe(data => {
      this.Categories = data['Categories'];
      this.merchants= data['merchants'];
      this.Hot_Deals= data['Hot_Deals'];
      for(let item of this.Hot_Deals){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
      }
      this.HomeGarden = data['home_Garden'];
      for(let item of this.HomeGarden){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
      }
      this.HomeHealth = data['home_Health'];
      for(let item of this.HomeHealth){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
      }
      this.HomeApperel = data['home_Apperel'];
      for(let item of this.HomeApperel){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
      }
      this.HomeElectronics = data['home_Electronics'];
      for(let item of this.HomeElectronics){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
      }


      // console.log('Categories are:', this.Categories);
      // console.log('merchants are:', this.merchants);
    });
  }

  // getCategories() {
  //   this.AppService.getProductSubCategories().subscribe(data => {
  //     this.Categories = data['Categories'];
  //     // console.log('Categories are:', this.Categories);
  //   });
  // }

  // getBrandNames(){
  //   this.AppService.getdealsBrands().subscribe(data => {
  //     this.BrandName = data;
  //     // console.log('Brands Name are:', this.BrandName);
  //   });
  // }

  // getRecentlySearchItems(){
  //   var searchhistory = "iphone";
  //   this.AppService.searchGeneric(searchhistory, -1, -1, -1, -1, -1, 1).subscribe(
  //     data => {
  //       this.RecentlySearch = data['results'];
  //       // console.log('Recently search itessssssssssssssssss', this.RecentlySearch);
  //     }
  //   );
  // }

  // getRecommendations() {
  //     // var naam = this.title.split(' ');
  //     // this.i = 1;
  //     var recom = this.title;
  //     this.AppService.ProductsComparison(recom).subscribe(
  //       data => {
  //         this.Recommendations = data['results'];
  //       }
  //     );
  // }

}

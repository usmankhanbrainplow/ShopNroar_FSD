import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  public Recommendations: any = [];
  i=0;


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

  constructor(private AppService: AppServices) { }

  ngOnInit() {
    this.getRecommendations();
  }

  getRecommendations() {
    // var naam = this.title.split(' ');
    // this.i = 1;
    var recom = localStorage.getItem('Recommendation');
    this.AppService.ProductsComparison('Iphone').subscribe(
      data => {
        this.Recommendations = data['results'];
      }
    );
  }
}

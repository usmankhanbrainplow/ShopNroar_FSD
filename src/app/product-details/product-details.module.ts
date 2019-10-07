import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common'
// import {Resultrouting,appRoutingProviders} from './wishlistuser.rout
// es';
import { FormsModule } from '@angular/forms';
import {SlickModule} from 'ngx-slick';

import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import {MatButtonModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {RoundProgressModule} from "angular-svg-round-progressbar";
// import {RecentlysearchModule} from '../recentlysearch/recentlysearch.module';
// import {RecommendationsModule} from '../recommendations/recommendations.module';
import {ProductDetailsComponent} from './product-details.component';
import {ProductDetailRoutes} from './product-details.routing';
import {CarouselhotdelsModule} from '../carouselhotdeals/carouselhotdels.module';
import {OwlModule} from '../owl.module';
import {CeilingPricePipe} from './ceiling-price.pipe';
import {ImageZoomModule} from 'angular2-image-zoom';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    CeilingPricePipe,
  ],
  imports: [
    CommonModule,
    ImageZoomModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ProductDetailRoutes),
    RoundProgressModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    SlickModule.forRoot(),
    // RecommendationsModule,
    // RecentlysearchModule,
    CarouselhotdelsModule,
    OwlModule,


  ],
  providers:[],
  exports:[]

})
export class ProductDetailsModule { }

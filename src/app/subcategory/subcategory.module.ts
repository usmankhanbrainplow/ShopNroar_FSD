import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common'

// import {Resultrouting,appRoutingProviders} from './wishlistuser.routes';
import { FormsModule } from '@angular/forms';
import {SlickModule} from 'ngx-slick';

import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import {MatButtonModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {RoundProgressModule} from "angular-svg-round-progressbar";
// import {RecentlysearchModule} from '../recentlysearch/recentlysearch.module';
// import {RecommendationsModule} from '../recommendations/recommendations.module';
import {SubcategoryComponent} from './subcategory.component';
import {SubcategoryRoutes} from './subcategory.routing';
import {OwlModule} from '../owl.module';


@NgModule({
  declarations: [
  SubcategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(SubcategoryRoutes),
    RoundProgressModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    OwlModule,
    SlickModule.forRoot(),
    // RecommendationsModule,
    // RecentlysearchModule,

  ],
  providers:[],
  exports:[]

})
export class SubcategoryModule { }

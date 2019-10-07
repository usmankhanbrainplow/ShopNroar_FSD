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
import {HotdealsComponent} from './hotdeals.component';
import {HotdealsRoutes} from './hotdeals.routing';
import {OwlModule} from '../owl.module';


@NgModule({
  declarations: [
    HotdealsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(HotdealsRoutes),
    RoundProgressModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    SlickModule.forRoot(),
    OwlModule
    // RecommendationsModule,
    // RecentlysearchModule,

  ],
  providers:[],
  exports:[]

})
export class HotdealsModule { }

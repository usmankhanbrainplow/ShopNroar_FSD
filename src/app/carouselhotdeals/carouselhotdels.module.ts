import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common'

// import {Resultrouting,appRoutingProviders} from './wishlistuser.routes';
import { FormsModule } from '@angular/forms';
import {SlickModule} from 'ngx-slick';

import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import {MatButtonModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {RoundProgressModule} from "angular-svg-round-progressbar";
import {CarouselhotdealsComponent} from './carouselhotdeals.component';





@NgModule({
  declarations: [

    CarouselhotdealsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RoundProgressModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    SlickModule.forRoot(),

  ],
  providers:[],
  exports:[CarouselhotdealsComponent]

})
export class CarouselhotdelsModule { }

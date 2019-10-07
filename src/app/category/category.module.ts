import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common'

// import {Resultrouting,appRoutingProviders} from './wishlistuser.routes';
import { FormsModule } from '@angular/forms';
import {SlickModule} from 'ngx-slick';

import {CategoryComponent} from './category.component';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import {MatButtonModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {RoundProgressModule} from "angular-svg-round-progressbar";

import {CategoryRoutes} from './category.routing';
import {OwlModule} from '../owl.module';


@NgModule({
  declarations: [
    CategoryComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
     HttpModule,
    RouterModule.forChild(CategoryRoutes),
    RoundProgressModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    SlickModule.forRoot(),
    OwlModule

  ],
  providers:[],
  exports:[]

})
export class CategoryModule { }

import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common'

// import {Resultrouting,appRoutingProviders} from './wishlistuser.routes';
import { FormsModule } from '@angular/forms';
import {SlickModule} from 'ngx-slick';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import {MatButtonModule, MatOptionModule, MatSelectModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {RoundProgressModule} from "angular-svg-round-progressbar";
import {OwlModule} from '../owl.module';
import {DealsComponent} from './deals.component';
import {DealsRoutes} from './deals.routing';


@NgModule({
  declarations: [
    DealsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(DealsRoutes),
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
export class DealsModule { }

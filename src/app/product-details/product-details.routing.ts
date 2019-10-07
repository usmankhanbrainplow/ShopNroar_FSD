import { Routes } from '@angular/router';
import {ProductDetailsComponent} from './product-details.component';


export const ProductDetailRoutes: Routes = [
  {

    path: '',
    children: [ {
      path: '',
      component: ProductDetailsComponent
    }]
  }
];

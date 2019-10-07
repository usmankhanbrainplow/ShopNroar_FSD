import { Routes } from '@angular/router';

import {SubcategoryComponent} from './subcategory.component';

export const SubcategoryRoutes: Routes = [
  {

    path: '',
    children: [ {
      path: '',
      component: SubcategoryComponent
    }]
  }
];

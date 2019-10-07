import { Routes } from '@angular/router';
import {CategoryComponent} from './category.component';

export const CategoryRoutes: Routes = [
  {

    path: '',
    children: [ {
      path: '',
      component: CategoryComponent
    }]
  }
];

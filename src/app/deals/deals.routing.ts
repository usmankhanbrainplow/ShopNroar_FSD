import { Routes } from '@angular/router';
import {DealsComponent} from './deals.component';

export const DealsRoutes: Routes = [
  {

    path: '',
    children: [ {
      path: '',
      component: DealsComponent
    }]
  }
];

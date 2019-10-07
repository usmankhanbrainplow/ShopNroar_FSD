import { Routes } from '@angular/router';
import {HotdealsComponent} from './hotdeals.component';


export const HotdealsRoutes: Routes = [
  {

    path: '',
    children: [ {
      path: '',
      component: HotdealsComponent
    }]
  }
];

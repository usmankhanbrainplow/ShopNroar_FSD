import { Routes } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
// import {ProductDetailComponent} from './product-detail/product-detail.component';
// import {SearchComponent} from './search/search.component';
import {CategoryComponent} from './category/category.component';
import { SubcategoryComponent} from './subcategory/subcategory.component';
import {DealsComponent} from './deals/deals.component';
import {HotdealsComponent} from './hotdeals/hotdeals.component';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacypolicyComponent} from './privacypolicy/privacypolicy.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {TorsComponent} from './tors/tors.component';
import {UpdatepasswordComponent} from './updatepassword/updatepassword.component';
import {UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {WishlistuserComponent} from './wishlistuser/wishlistuser.component';
import {SearchComponent} from './Search/search.component';

export const AppRoutes: Routes = [
  // { path: '', component: HomepageComponent },
  { path: '', component: HomeComponent},
  // { path: 'detail', component: ProductDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'view/:id',
    loadChildren: 'src/app/category/category.module#CategoryModule'
  },
  {
    path: 'subcategory/:id/:subid',
    loadChildren: 'src/app/subcategory/subcategory.module#SubcategoryModule'
  },
  {path: 'deals/:id',
    loadChildren:'src/app/deals/deals.module#DealsModule'},
  {path: 'hotdeals', loadChildren: 'src/app/hotdeals/hotdeals.module#HotdealsModule'},
  {path: 'sub-cat', component:SubcategoriesComponent},
  {path: 'about' , component: AboutComponent},
  {path: 'contact' , component: ContactComponent},
  {
    path: 'details' ,
    loadChildren: 'src/app/product-details/product-details.module#ProductDetailsModule'},
  {path: 'policy' , component: PrivacypolicyComponent},
  {path: 'terms', component: TorsComponent},
  {path: 'updatepassword' , component: UpdatepasswordComponent},
  {path: 'profile' , component: UpdateprofileComponent},
  {path: 'myshopnroar' , component: WishlistuserComponent},
  {path: 'result/:id/:cat', component: SearchComponent},
];

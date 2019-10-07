import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {SlickModule} from 'ngx-slick';
import {AppRoutes} from './app.routing';
import {MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatSelectModule} from '@angular/material';
import {MatOptionModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ElectronicsComponent} from './electronics/electronics.component';
import {DOCUMENT} from '@angular/platform-browser';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {PagerService} from './_services/pager.service';
import {SimpleGlobal} from 'ng2-simple-global';
import {HomeGardenComponent} from './home-garden/home-garden.component';
import { AppComponent } from './app.component';
import {ApparelAccessoriesComponent} from './apparel-accessories/apparel-accessories.component';
import {HealthBeautyComponent} from './health-beauty/health-beauty.component';
import { HomeComponent } from './home/home.component';
// import { SearchComponent } from './search/search.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { CategoryComponent } from './category/category.component';
import {CategoryModule} from './category/category.module';

import { CarouselhotdealsComponent } from './carouselhotdeals/carouselhotdeals.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import {ResetPasswordComponent} from './login/login.component';
// import {DealsComponent} from './deals/deals.component';
import {DealsGridComponent} from './deals-grid/deals-grid.component';
import {RecapchaModule} from './recapcha/recapcha.module';
import {AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
// import {HotdealsComponent} from './hotdeals/hotdeals.component';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {AboutComponent} from './about/about.component';
import {PartnersComponent} from './partners/partners.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacypolicyComponent} from './privacypolicy/privacypolicy.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {Tagspipe} from './Search/tagspipe';
import {TorsComponent} from './tors/tors.component';
import {UpdatepasswordComponent} from './updatepassword/updatepassword.component';
import {UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {WishlistuserComponent} from './wishlistuser/wishlistuser.component';
import {SearchComponent} from './Search/search.component';
import {CarouselhotdelsModule} from './carouselhotdeals/carouselhotdels.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {OwlModule} from './owl.module';
import {CeilingPricePipe} from './product-details/ceiling-price.pipe';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("137858875633-seekn0v20aafb3h1fm738i2b4870s5r9.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("384235361979008")
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  // }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    WishlistuserComponent,
    // SearchComponent,
    // ProductDetailComponent,
    // ProductDetailsComponent,
    TorsComponent,

    SubcategoriesComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    // CategoryComponent,
    // CarouselhotdealsComponent,
    ResetPasswordComponent,
    // DealsComponent,
    DealsGridComponent,
    PrivacypolicyComponent,
    AboutComponent,
    // HotdealsComponent,
    PartnersComponent,
    ContactComponent,
    UpdatepasswordComponent,
    UpdateprofileComponent,
    Tagspipe,
    ElectronicsComponent,
    HomeGardenComponent,
    ApparelAccessoriesComponent,
    HealthBeautyComponent,
    // CeilingPricePipe,
    // ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule, MatDialogModule,
    RouterModule.forRoot(AppRoutes),
    SlickModule.forRoot(),
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    RoundProgressModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RecapchaModule, MatCardModule,
    // CategoryModule,
    OwlModule,
    CarouselhotdelsModule,
  ],
  providers: [PagerService,SimpleGlobal,SocialLoginModule, AuthService,  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})


export class AppModule { }

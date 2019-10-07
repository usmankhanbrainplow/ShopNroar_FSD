import {Component, OnInit } from "@angular/core";

import {Route, Router, Routes} from "@angular/router";
import {AppServices} from '../app.services';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
  providers: []

})

export class SubcategoriesComponent implements OnInit {
  getProducts_Sub: any= [];
  private router: Router;
  modelNo: any;


  constructor(private httpService: AppServices) {

  }

  Navigation(cat,subcat,subname){
    this.router.navigate(['/subcategory',cat,subcat], { queryParams: { CatName: subname} } )

  }


  ngOnInit(){
    this.get_Product_Sub_Categories();
  }
  get_Product_Sub_Categories(){
    this.httpService.getProductSubCategories().subscribe(responce=> {
      this.getProducts_Sub = responce['Categories'];
    });
  }
}

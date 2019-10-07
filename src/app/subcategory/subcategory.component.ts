import { Component, OnInit } from '@angular/core';
import {AppServices} from '../app.services';
import {ActivatedRoute, Router} from '@angular/router';
import {PagerService} from '../_services/pager.service';

@Component({
  selector: 'app-search',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  Categories: any= [];
  lowprice:any;
  highprice:any;
  public Getspecs:any=[];
  CatName: any;
  pager: any = {};
  listview=false;
  gridview=true;
  pagecount=40;
  sort: any;
  modelNo: any;
  subid:any;
  filteredbrand:any;
  filteredmerchant:any;
  filteredsub:any;
  pageno: any;
  apiflag=false;
  sliderFlag= false;
  options = [{'name': 'Best Match'}, {'name': 'Price: Low to High'}, {'name': 'Price: High to Low'}];
  selectedOption = this.options[0];
  p: any;
  countoptions = [
    {'name': 'Items per page'},
    {'name': '20'},
    {'name': '50'},
    {'name': '100'}];
  selectedCount = this.countoptions[0];


  constructor(private AppService: AppServices, private router: Router,private route: ActivatedRoute,private pagerService: PagerService) { }

  ngOnInit() {

    this.sort = "Best Match";
    this.route.queryParams.subscribe(params => {
      this.CatName = params['CatName'];
      // this.CatName = this.CatName.replace('_',' ');
      for(let i = 0; i < this.CatName.length; i++) {

        this.CatName = this.CatName.replace("-", " ");
      }
      this.CatName = this.CatName.replace('and','&');
      // this.CatName = this.CatName.replace('',',');
    });
    this.route.params.subscribe( params => {
      this.modelNo = params['id'];
      this.subid = params['subid']
    });
    this.getCategories();
    this.search();
  }



  getCategories() {
    this.AppService.getProductSubCategories().subscribe(data => {
      this.Categories = data['Categories'];
    });
  }




  onChangeOption(event) {
    this.sort = event.name;

    if (this.sort === 'Best Match'){
      this.sort = undefined
    }
    else if (this.sort === 'Price: Low to High'){
      this.sort = 'ASC'
    }
    else if(this.sort = 'Price: High to Low'){
      this.sort = 'DESC'
    }

    this.pageno = 1;
    this.p=1;
    this.search()

  }

  onChangeCount(event){
    this.pagecount=event.name;
    this.Getspecs=[];
    this.search();
  }

  setPage(page: number) {
    this.pageno = page;
    this.search();
  }

  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&','and');
    category = category.replace(',','');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }

  ProductPrice(low: any, high: any) {
    this.lowprice=low;
    this.highprice=high;
    this.Getspecs=[];
    this.search()
  }

  listviewfun(){
    this.listview=true;
    this.gridview=false;
  }
  gridviewfun(){
    this.listview=false;
    this.gridview=true;
  }


  search() {
    if (this.sort == "Best Match") {
      this.AppService.FilterProductsbySubCategory(this.modelNo,this.subid, this.pagecount,this.lowprice,this.highprice,this.filteredbrand,this.filteredmerchant,this.filteredsub,this.pageno,'full').subscribe(
        data => {
          this.Getspecs = data;
          this.pager = this.pagerService.getPager(this.Getspecs['totalItems'], this.pageno,this.pagecount);
          if(this.Getspecs['results'].length>0){
            this.apiflag=false;
            this.sliderFlag = true;
          }
          else {
            this.apiflag=true;
          }
        },error2 => {
          if(this.Getspecs['results'].length>0){
            this.apiflag=false;
            this.sliderFlag = true;

          }
          else {
            this.apiflag=true;
          }
        }
      );

    }


  }


}

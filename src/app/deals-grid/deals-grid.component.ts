import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AppServices} from '../app.services';
import {Http} from "@angular/http";
import {PagerService} from "../_services";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-deals-grid',
  templateUrl: './deals-grid.component.html',
  styleUrls: ['./deals-grid.component.scss']
})
export class DealsGridComponent implements OnInit {
  private url = environment.apiUrl;
  apiflag=false;
  pagecount=36;
  listview = false;
  gridview = true;
  public products: any;
  Categories: any= [];
  sub:any;
  brand:any;
  brand1:any;
  pageno: any;
  public brands:any = [];
  public Popular: any= [];
  count: any;
  pager:any={};

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private httpService: AppServices, private router: Router, private http: Http, private route: ActivatedRoute,private pagerService:PagerService) { }

  ngOnInit() {
    this.Categories = JSON.parse(localStorage.getItem('Categories'));
    this.sub = this.route.params.subscribe(params => {
      this.brand1 = params['id']; // (+) converts string 'id' to a number
      this.brand = params['id'] // (+) converts string 'id' to a number
      this.pageno=1;
      // if (isPlatformBrowser(this.platformId)) {
      //   window.scroll(0, 0);
      // }
      this.brandsearch()
    });

    setTimeout(() => {

      this.getdealsBrands().subscribe(
        data => {


          this.brands = data
        }
      );
    }, 1000)

    setTimeout(() => {

      this.getTrendsGame(1).subscribe(
        data => {


          this.Popular = data
        }
      );
    }, 1500)
  }

  listviewfun() {
    this.listview = true;
    this.gridview = false;
  }
  gridviewfun() {
    this.listview = false;
    this.gridview = true;
  }


  changebrand(brand){
    this.httpService.Filterdealsbybrand(brand,this.pagecount,1,'full').subscribe(
      data => {
        this.products = data;
        this.count = data['totalItems'];
        //console.log(this.products);

      }
    );


  }


  brandsearch(){
    // //console.log(this.pageno)
    if(this.brand!=='all'){
      this.httpService.Filterdealsbybrand(this.brand,this.pagecount,this.pageno,'full').subscribe(
        data => {
          this.products = data;
          for(let item of this.products['results']){
            item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
          }
          this.count = data['totalItems'];
          this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,this.pagecount);
          //console.log(this.products);
          if(this.products['results'].length>0){
            this.apiflag=false;
          }
          else {
            this.apiflag=true;
          }
        },
        error2 => {
          // alert('error')
          if(this.products['results'].length>0){
            this.apiflag=false;
          }
          else {
            this.apiflag=true;
          }
          //console.log(this.apiflag)
        }
      );
    }
    else {
      this.httpService.getdailydeals(this.pageno,this.pagecount).subscribe(
        data => {
          this.products = data;
          this.count = data['totalItems'];
          this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,this.pagecount);
          //console.log(this.products);
          if(this.products['results'].length>0){
            this.apiflag=false;
          }
          else {
            this.apiflag=true;
          }
          //console.log(this.apiflag)

        },
        error2 => {
          // alert('error')
          if(this.products['results'].length>0){
            this.apiflag=false;
          }
          else {
            this.apiflag=true;
          }
          //console.log(this.apiflag)

        }
      );
    }


  }
  getdealsBrands() {

    return this.http.get(this.url + 'products/dealsBrands').map(response => response.json());

  }

  getTrendsGame(page: any) {

    return this.http.get(this.url + 'trend/getTrendsgame?page=' + page).map(response => response.json());

  }

  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&','and');
    category = category.replace(',','');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }
}

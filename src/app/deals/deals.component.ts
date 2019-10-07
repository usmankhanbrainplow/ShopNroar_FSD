import {Component, Inject, OnInit, OnDestroy, PLATFORM_ID} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";
import {PagerService} from "../_services";
import {AppServices} from '../app.services';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],

})
export class DealsComponent implements OnInit {

  pagecount=40;
  cat;
  minprice;
  maxprice;
  sort;
  search;
  query: string;
  listview = false;
  gridview = true;
  private url = environment.apiUrl;
  slice=20;
  errorflag=false;
  apiflag=false;
  Categories: any= [];
  sub:any;
  brand:any;
  brand1:any;

  count: any;
  public products;
  p: any;
  brandsname: any
  pageno: any;
  public Popular: any= [];
  public categories: any[] = [];
  public brands:any = [];
  options = [
    {'name': 'Best Match'},
    {'name': 'Latest Deals First'},
    {'name': 'Oldest Deals First'},
    {'name': 'Price: Low to High'},
    {'name': 'Price: High to Low'}];
  selectedOption = this.options[0];
  countoptions = [{'name': 'Items per page'}, {'name': '20'}, {'name': '50'}, {'name': '100'}];
  selectedCount = this.countoptions[0];
  pager:any={};
  public brandname: 'Amazon';
  public getdealsCat: any;
  public price_low: any;
  public price_high: any;
  public catname: any;
  // public sort: any;
  public filterdesls:any={};
   save: any;
  private Getproducts: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private httpService: AppServices, private router: Router, private http: Http, private route: ActivatedRoute,private pagerService:PagerService) {
  }

  listviewfun() {
    this.listview = true;
    this.gridview = false;
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
  pageChanged(event) {
    // //alert"laptop")
    this.p = event;
    this.pageno = event;
    this.getdelasbybrnad()
    // this.brandsearch()
  }

  gridviewfun() {
    this.listview = false;
    this.gridview = true;
  }
  loadmoreCategories(){
    this.slice=this.slice+20;
  }
  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&', 'and');
    category = category.replace(',', '');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }
  onChangeOption(event){
    this.sort = event.name;
    if(this.sort === 'Best Match'){
      this.sort = 'undefine';
    }
    else if(this.sort === 'Price: Low to High'){
      this.sort = 'ASC';
    }
    else if(this.sort === 'Price: High to Low'){
      this.sort = 'DESC'
    }
    else if(this.sort === 'Latest Deals First'){
      this.sort = 'LATEST'
    }
    else if(this.sort === 'Oldest Deals First'){
      this.sort = 'OLDEST'
    }
    this.getdelasbybrnad();
    // this.brandsearch()
  }
  onChangeCount(event){
    this.pagecount=event.name;
    this.getdelasbybrnad();
  }
  setPage(page:number){
    this.pageno = page;

    // this.brandsearch()
    this.getdelasbybrnad();
  }
  getdealsbyCategory() {
    this.httpService.getdealsCategory(this.brand1).subscribe(
      data => {
        this.getdealsCat = data;
      }
    );
  }
  ResetFilter() {
    this.brandsname = this.brand1;
    this.pagecount = 40;
    this.minprice = -1;
    this.maxprice = -1;
    this.sort = "undefine";
    this.search = "undefine";
    this.cat = "undefine";
    this.getdelasbybrnad();
  }
  filter(query) {
    if (query !== '') {
      this.search = query;
      this.getdelasbybrnad();
    }
    else if (query === '') {
      this.minprice = -1;
      this.maxprice = -1;
      this.sort = "undefine";
      this.search = "undefine";
      this.cat = "undefine";
      this.getdelasbybrnad();
    }
  }

  Pricefilters(minprice, maxprice) {
    this.minprice = minprice;
    this.maxprice = maxprice;
    this.getdelasbybrnad();
  }
  Categoryfilters(cat){
    this.cat = cat;
    this.getdelasbybrnad()
  }
  getdelasbybrnad() {
    // if(this.brand!=='all'){
// alert(this.maxprice)
      this.httpService.Getfilterdeals(this.brand1, this.pagecount, this.pageno, this.cat, this.minprice, this.maxprice, this.sort, this.search).subscribe(data => {
        this.Getproducts = data['results'];
        for(let item of this.Getproducts){
          item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
          // console.log('imagessssssssssssssssssss', item['SNR_ImageURL'])
        }
        this.pager = this.pagerService.getPager(data['items'], this.pageno,40);
        this.count = data['totalItems'];
      });
    // }
  }

  // brandsearch(){
  //   // //console.log(this.pageno)
  //   if(this.brand!=='all'){
  //     this.httpService.DealsFilters(this.brand1,this.pageno,this.pagecount,this.price_low,this.price_high,this.catname,this.sort).subscribe(
  //       data => {
  //         this.products = data;
  //         for(let item of this.products['results']){
  //           item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
  //         }
  //         // for(let item of this.products['results']){
  //         //   this.save = (item['SNR_PriceAfter']/item['SNR_PriceBefore'])*100;
  //         //  console.log('discount rupees......', item)
  //         // }
  //         this.count = data['totalItems'];
  //         this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,this.pagecount);
  //         if(this.products['results'].length>0){
  //           this.apiflag=false;
  //         }
  //         else {
  //           this.apiflag=true;
  //         }
  //       },
  //       error2 => {
  //         // alert('error')
  //         if(this.products['results'].length>0){
  //           this.apiflag=false;
  //         }
  //         else {
  //           this.apiflag=true;
  //         }
  //         //console.log(this.apiflag)
  //       }
  //     );
  //   }
  //   else {
  //     this.httpService.getdailydeals(this.pageno,this.pagecount).subscribe(
  //       data => {
  //         this.products = data;
  //         this.count = data['totalItems'];
  //         this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,this.pagecount);
  //         //console.log(this.products);
  //         if(this.products['results'].length>0){
  //           this.apiflag=false;
  //         }
  //         else {
  //           this.apiflag=true;
  //         }
  //         //console.log(this.apiflag)
  //
  //       },
  //       error2 => {
  //         // alert('error')
  //         if(this.products['results'].length>0){
  //           this.apiflag=false;
  //         }
  //         else {
  //           this.apiflag=true;
  //         }
  //         //console.log(this.apiflag)
  //
  //       }
  //     );
  //   }
  //
  //
  // }
  ngOnInit() {
    this.Categories = JSON.parse(localStorage.getItem('Categories'));
    this.sub = this.route.params.subscribe(params => {
      this.brand1 = params['id']; // (+) converts string 'id' to a number
      this.brand = params['id']; // (+) converts string 'id' to a number
      this.pageno=1;
      this.pagecount = 40;
      this.catname = -1;
      // this.sort = 'Latest';
      this.price_low = -1;
      this.price_high = -1;
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
      this.minprice = -1;
      this.maxprice = -1;
      this.sort = "undefine";
      this.search = "undefine";
      this.cat = "undefine";
      // alert(this.minprice)
      // alert(this.maxprice)
      // alert(this.sort)
      // alert(this.search)
      // this.brandsearch()
      this.getdelasbybrnad()
      this.getdealsbyCategory();
    })

    // setTimeout(() => {
    //
    //   this.getdealsBrands().subscribe(
    //     data => {
    //
    //
    //       this.brands = data
    //     }
    //   );
    // }, 1000)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  // ngOnDestroy(){
  //   setTimeout(()=>{
  //     document.getElementById('stickyCategory').style.position='unset';
  //     document.getElementById('stickyCategory').style.top='0';
  //   },1000)
  // }
  getdealsCategories() {

    return this.http.get(this.url + 'products/dealsCategories').map(response => response.json());

  }

  // getdealsBrands() {
  //
  //   return this.http.get(this.url + 'products/dealsBrands').map(response => response.json());
  //
  // }

  getTrendsGame(page: any) {

    return this.http.get(this.url + 'trend/getTrendsgame?page=' + page).map(response => response.json());

  }
  getalpha(event:string){
    //console..log(event)
    // alert(event)
    return event[0].substring(0,1)
  }

}

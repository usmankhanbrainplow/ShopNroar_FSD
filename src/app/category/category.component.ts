import {Component, OnInit,OnDestroy, Inject, PLATFORM_ID , ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Headers, Http} from '@angular/http';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert';
import {environment} from '../../environments/environment';
import {SimpleGlobal} from 'ng2-simple-global';

import {PagerService} from "../_services/pager.service";
import {AppServices} from '../app.services';
@Component({
  selector: 'app-allmobiles',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {

  private urlapi = environment.apiUrl;
  isActive: boolean= false;
  WishCheck:boolean= false;
  subcategoryCollapse =false;
  merchantlist: any=[];
  brandlist: any=[];
  filteredbrand:any;
  filteredmerchant:any;
  filteredsub:any;
  CatName: any;
  pagecount=40;
  lowprice:any;
  highprice:any;
  date:any;
  reviewCount=10;
  category_check=false;
  errorflag:any;

  minimum=1;
  maximum=100000;
  step=100;

  current=80;
  max=5;
  showTicks = false;
  autoTicks = false;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;

  overallrating=2.5;
  overallStarrating=60/20;
  // vendorSinglereviews: review;
  graph=false;
  options = [{'name': 'Best Match'}, {'name': 'Price: Low to High'}, {'name': 'Price: High to Low'}];
  selectedOption = this.options[0];

  countoptions = [{'name': 'Items per page'}, {'name': '20'}, {'name': '50'},  {'name': '100'}];
  selectedCount = this.countoptions[0];
  sort: any;
  chartCategories=[];
  positiveseries=[];
  negativeseries=[];
  neutralseries=[];
  // chartCategories=['General','Price','Weight']

  chart : any;




  color = 'primary';
  colorwarn = 'warn';
  mode = 'determinate';
  value = 80;

  selectedPrice=0;
  percentage= -25;
  objectKeys = Object.keys;
  // options = [{'name': 'Best Match'}, {'name': 'Price: Low to High'}, {'name': 'Price: High to Low'}];
  // selectedOption = this.options[1]
  count = 0;
  sub: any;
  listview=false;
  gridview=true;
  apiflag=false;
  merchantflag=false;

  searchedQuery: string;
  show: any;
  // sort: any;
  modelNo: any;
  query: string;
  path = 'wearable.jpg';
  title = 'app works!';
  Popular: any = [];
  popularcheck = false;
  Categories: any= [];
  public Getspecs: any =[];

  public FilteredCats: any[] = [];
  filteredCatsCount=10;
  filteredBrandsCount=10;
  filteredMerchantsCount=10;
  public FilteredBrands: any[] = [];
  public FilteredMerchants: any[] = [];

  pager: any = {};

  doSomethingWithCurrentValue($event){
    //console.log(event)
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private httpService: AppServices,
              public sgflag: SimpleGlobal,
              private ref: ChangeDetectorRef,
              private http: Http,
              private router: Router,
              private pagerService: PagerService) {
  }

  ngOnInit() {
    this.Categories = JSON.parse(localStorage.getItem('Categories'));
    // this.httpService.getTrendsGame(1, 'full').subscribe(
    //   data => {
    //     this.Popular = data;
    //     if(this.Popular.totalItems > 0) {
    //       this.popularcheck = true
    //     }
    //   }
    // );
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0)
    }
 
  }
  ngAfterViewInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      //  //alert"call")
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
      this.modelNo = this.id;
      this.pageno = 1;
      this.sort = undefined;
      this.selectedOption = this.options[0];

      this.filters();

      this.search();

      this.show = "Search any " + this.modelNo;
    });
    this.route.queryParams.subscribe(params => {
      this.CatName = params['CatName'];
      // this.CatName = this.CatName.replace('_',' ');
      for(let i = 0; i < this.CatName.length; i++) {

        this.CatName = this.CatName.replace("-", " ");

      }
      this.CatName = this.CatName.replace('and','&');
      // this.CatName = this.CatName.replace('',',');
    });
    this.ref.detectChanges();
    this.ref.reattach();
  }

  ngOnDestroy(){
    setTimeout(()=>{
      document.getElementById('stickyCategory').style.position='unset';
      document.getElementById('stickyCategory').style.top='0';
    },1000);
  }

  loadmoreCats(){
    this.filteredCatsCount=this.filteredCatsCount+10;
  }
  loadmoreBrands(){
    this.filteredBrandsCount=this.filteredBrandsCount+10;
  }

  filterbyBrand(item,index){

    this.filteredbrand=item;
    for(let i=0; i<this.FilteredBrands.length; i++){
      if(index == i){
        this.brandlist[i] = !this.brandlist[i]
      }
    }

    this.filters();
    this.search();


  }
  filterbySubcats(item)
  {
    this.filteredsub=item;
    this.filters();
    this.search();
  }
  filterbyMerchants(item,index){

    this.filteredmerchant=item;
    for(let i=0; i<this.FilteredMerchants.length; i++){
      if(index == i){
        this.merchantlist[i] = !this.merchantlist[i]
      }
    }

    this.filters();
    this.search();

  }
  ProductPrice(low: any, high: any) {
    this.lowprice=low;
    this.highprice=high;
    this.Getspecs=[];
    this.search()
  }

  getAllCategories() {

    return this.http.get(this.url + 'search/GetAllCategories').map(response => response.json());

  }
  p: any;
  pageno: any;
  listviewfun(){
    this.listview=true;
    this.gridview=false;
  }
  categoryChanged(category){
    this.httpService.FilterProductsbyCategory(category,this.pagecount,this.lowprice,this.highprice,this.filteredbrand,this.filteredmerchant,this.filteredsub,this.pageno,this.sort,'full').subscribe(
      data => {
        this.Getspecs = data;
        this.category_check=true;


      }
    );
  }
  gridviewfun(){
    this.listview=false;
    this.gridview=true;
  }
  pageChanged(event) {
    this.p = event;
    this.pageno = event;

    this.search()

  }
  // onClickheart(){
  //   this.isActive = !this.isActive;
  // }

  // addInwishlist(item: any) {
  //   // alert("adding")
  //   this.httpService.Addwishlist(item).subscribe();
  //   this.isActive = !this.isActive;
  //   console.log('product add to wish list status is...', this.WishCheck)
  //   swal('Successfully Added to your Wishlist','', 'success')
  //   this.CheckWatchList();
  // }
  // CheckWatchList(){
  //   this.httpService.CheckWishList(this.Getspecs['SNR_ProductURL']).subscribe(data => {
  //     this.WishCheck = data['status'];
  //
  //   });
  // }
  // RemoveFromWatchList(){
  //   this.httpService.Unwatch(this.Getspecs['SNR_ProductURL']).subscribe(data =>{
  //     swal('Successfully Removed to your Wishlist','', 'success')
  //     console.log('product add to wish list status is...', this.WishCheck)
  //     this.CheckWatchList();
  //     // this.WishCheck= false;
  //     // if(data['Description']=== 'Item Deleted'){
  //     //   this.WishCheck = !this.WishCheck;
  //     // }
  //   })
  // }

  oldcall: any;

  onClick() {
    this.oldcall = this.modelNo;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Best Matchs to 0 if no query param provided.
        this.modelNo = params['Name'] || 0;
        // //alertthis.modelNo+" model")
        // //alertthis.modelNo)
      });
    //this.show="Search any "+this.modelNo;

    setTimeout(() => {
      this.show = "Search any " + this.modelNo;

    }, 1000)


  }

  pagetogo = 1;

  onChangeCount(event){
    this.pagecount=event.name;
    this.Getspecs=[];
    this.search();
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

  loadmore(event) {

    this.pagetogo = this.pagetogo + 1;

    this.ref.detectChanges();
    this.ref.reattach();

  }

  id: any;
  AllCount: any = [];
  flag = false;


  private url = environment.apiUrl;


  user: any;

  filters(){


    this.ProductsCountbyCategory(this.modelNo,this.pagecount,this.lowprice,this.highprice).subscribe(
      data=>{
        this.count = data;
        // ['totalItems']
      }
    );
    this.getFilteredBrands(this.modelNo).subscribe(
      data => {
        this.FilteredBrands = data['Brands'];
      }
    );
    this.getFilteredMerchants(this.modelNo).subscribe(
      data => {
        this.FilteredMerchants = data['Merchants'];
        for(let i=0; i<this.FilteredMerchants.length; i++){
          this.merchantlist.push(false);
        }
      }
    );
  }
  Navigation(subcat,subname){
    this.router.navigate(['/subcategory',this.modelNo,subcat], { queryParams: { CatName: subname} } )
  }

  sliderFlag= false;
  Cat1: any;


  search(){
    this.getFilteredSubCats(this.modelNo).subscribe(
      data => {
        this.FilteredCats = data['SubCategories'];
        this.Cat1 = Math.ceil(this.FilteredCats.length/4);
      }
    );
    this.date=undefined;
    this.httpService.FilterProductsbyCategory(this.modelNo,this.pagecount,this.lowprice,this.highprice,this.filteredbrand,this.filteredmerchant,this.filteredsub,this.pageno,this.sort,'full').subscribe(
      data => {
        this.Getspecs = data;
        for(let item of this.Getspecs['results']){
          item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
        }
        this.category_check=true;

        this.pager = this.pagerService.getPager(data['items'], this.pageno,this.pagecount);

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
      });

  }

  getFilteredSubCats(category:any) {

    return this.http.get(this.url + 'products/GetSubCategoryofCategory/'+category).map(response => response.json());

  }
  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&','and');
    category = category.replace(',','');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }

  getFilteredBrands(category:any) {

    return this.http.get(this.url + 'products/GetBrandsofCategory/'+category).map(response => response.json());

  }

  getFilteredMerchants(category:any) {

    return this.http.get(this.url + 'products/GetMerchantsofCategory/'+category).map(response => response.json());

  }

  ProductsCountbyCategory(query: string, count:any,low:any,high:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url + 'products/categoryCount/' + query + '?count='+count+'&low='+low+'&high='+high).map(response => response.json());

  }

  getalpha(event:string){
    return event[0].substring(0,1)
  }

  setPage(page: number) {
    this.pageno = page;
    this.search();
  }

}

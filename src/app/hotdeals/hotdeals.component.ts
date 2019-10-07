import {Component, OnInit,OnDestroy} from '@angular/core';
import {AppServices} from '../app.services';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {PagerService} from "../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrls: ['./hotdeals.component.scss'],

})
export class HotdealsComponent implements OnInit{
  listview = false;
  gridview = true;
  count:any;
  public FilteredCats: any[] = [];
  modelNo: any;
  Categories: any= [];
  public products: any;
  AllProducts: any
  p:any;
  pageno=1;
  Popular: any = [];
  apiflag=false;
  pagecount=40;
  public Getspecs: any[] = [];
  options = [{'name': 'Best Match'}, {'name': 'Price: Low to High'}, {'name': 'Price: High to Low'}];
  selectedOption = this.options[0];
  countoptions = [{'name': 'Items per page'}, {'name': '20'}, {'name': '50'},  {'name': '100'}];
  sort = undefined;
  selectedCount = this.countoptions[0];
  private url = environment.apiUrl;
  public brands:any = [];
  pager:any={};
  lowprice:any;
  highprice:any;



  constructor(private httpService: AppServices, private router: Router, private http: Http,
              private pagerService:PagerService) {


  }

  listviewfun() {
    this.listview = true;
    this.gridview = false;
  }
  getdealsBrands() {

    return this.http.get(this.url + '/products/dealsBrands').map(response => response.json());

  }
  getFilteredSubCats(category:any) {

    return this.http.get(this.url + 'products/GetSubCategoryofCategory/'+category).map(response => response.json());

  }

  ProductPrice(low: any, high: any) {
    this.lowprice=low;
    this.highprice=high;
    this.Getspecs=[];
    // this.search()
    this.getMixDeals();
  }

  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&', 'and');
    category = category.replace(',', '');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }

  setPage(page:number) {
    // //alert"laptop")
    // this.p = event;
    this.pageno = page
    this.getMixDeals();

    // this.httpService.gethotdeals(this.pageno,this.sort).subscribe(
    //   data => {
    //     this.products = data;
    //     for(let item of this.products){
    //       item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
    //       console.log('Home page of the deals are.....', item['SNR_ImageURL'])
    //     }
    //     this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,36);
    //     this.count = data['totalItems'];
    //     //console.log(this.products);
    //
    //   }
    // );

  }

    gridviewfun() {
    this.listview = false;
    this.gridview = true;
  }
  Navigation(subcat,subname){
    console.log('Dataaaaaaaaaaaaaa aaaaa raha ha', subcat, subname)
    this.router.navigate(['/subcategory',this.modelNo,subcat], { queryParams: { CatName: subname} } )

  }
  onChangeCount(event){
    this.pagecount=event.name;
    this.Getspecs=[];
    // this.search();
    this.getMixDeals();
  }
  onChangeOption(event) {
    this.sort = event.name;

    if (this.sort === 'Best Match'){
      this.sort = undefined
    }
    else if (this.sort === 'Price: Low to High'){
      this.sort = 'ASC';
      // console.log('fuckkkkkkkkkkkkkkkkkkkkkkkkk', this.sort)
    }
    else if (this.sort === 'Price: High to Low'){
      this.sort = 'DESC'
    }

    this.pageno = 1;
    this.p=1;
    this.getMixDeals();
    // this.search()

  }
  ngOnInit() {

    this.getMixDeals();
    // this.search();
    this.Categories = JSON.parse(localStorage.getItem('Categories'));

    this.getdealsBrands().subscribe(
      data => {


        this.brands = data
      }
    );

    this.getFilteredSubCats(this.modelNo).subscribe(
      data => {
        console.log(data);
        this.FilteredCats = data['SubCategories'];
        this.Cat1 = Math.ceil(this.FilteredCats.length / 3)
        // console.log('Categories areeeeeeeeeeeeeeeeeeee', this.FilteredCats)
        // console.log('Number flooring isss', Math.ceil(2.6))
      }
    );
  }
  // ngOnDestroy(){
  //   setTimeout(()=>{
  //     document.getElementById('stickyCategory').style.position='unset';
  //     document.getElementById('stickyCategory').style.top='0';
  //   },1000)
  // }
  Cat1: any;
  // search() {
  //   this.httpService.gethotdeals(this.pageno, this.sort).subscribe(
  //     data => {
  //       this.products = data;
  //       for(let item of this.products.results){
  //         item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
  //         console.log('Home page of the deals are.....', item['SNR_ImageURL'])
  //       }
  //       this.count = data['totalItems'];
  //       this.pager = this.pagerService.getPager(this.products['totalItems'], this.pageno,40);
  //       console.log(this.products);
  //       if(this.products['results'].length>0){
  //         this.apiflag=false;
  //       }
  //       else {
  //         this.apiflag=true;
  //       }
  //     }
  //   );
  // }

  getalpha(event:string){
    //console..log(event)
    // alert(event)
    return event[0].substring(0,1)
  }

  getMixDeals(){
    this.httpService.gethotdeals(this.pageno, this.sort).subscribe(
      data => {
        this.AllProducts = data['results'];
        for (let item of this.AllProducts) {
          item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
        }
        this.pager = this.pagerService.getPager(data['totalItems'], this.pageno,40);
        this.count = data['totalItems'];
      })
  }
}

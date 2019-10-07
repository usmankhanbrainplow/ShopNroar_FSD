// import {HttpService} from '../http.service';
import {Http} from '@angular/http';
import {Component, AfterViewInit, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, ElementRef, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../environments/environment';
import swal from 'sweetalert';
import {DataService} from '../shareduser.service';
import {SimpleGlobal} from 'ng2-simple-global';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import { DataSharedService } from "../shareddata.service";
import {Observable} from "rxjs/Observable";
import {DealsComponent} from "../deals/deals.component";
import {AppServices} from '../app.services';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DealsComponent]
  // providers: [HttpService, DataService,DataSharedService,DealsComponent]
})
export class HeaderComponent implements OnInit, AfterViewInit,OnChanges {

  currentUser: any;
  Usertype: any;
  private url = environment.apiUrl;
  catCount: any;
  getProducts_Sub: any= [];

  public countries: any = [];
  public listTitles = [];
  public tempTitles = [];
  public TitlesL = [];
  public filteredList = [];
  public elementRef;
  public flag = false;
  public socialflag = false;
  public Category = [];
  message:string;
  catsIsCalled=false;
  called = false;
  HotDealsDrop = false;

  page: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private data: DataService,
              public sgflag: SimpleGlobal,
              private dataShared: DataSharedService,
              private httpC: HttpClient,
              private http: Http, private httpService: AppServices, myElement: ElementRef, private router: Router, private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
              private AppService: AppServices) {
    this.elementRef = myElement;
  }

  query: string;
  user: any;
  toogleFlag = false;
  brandsName: any=[];
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      this.Usertype = JSON.parse(localStorage.getItem('type')) || 0;
      if (this.currentUser != null)
        this.sgflag['login'] = true;
      else
        this.sgflag['login']= false;
      if (this.currentUser == 0)
        this.sgflag['login'] = false;
      if (this.Usertype != null) {
        this.socialflag = true;
        this.sgflag['flag'] = true;
      }
      if (this.Usertype == 0) {
        this.sgflag['flag'] = false;
        this.socialflag = false;
      }
    }
    this.callcategories();
    this.HotDealsMenu();
    this.sgflag['Category'] = this.Category;
    this.get_Product_Sub_Categories() ;
  }
  HotDealsMenu(){
    this.AppService.getdealsBrands().subscribe( data => {
      this.brandsName = data;
      // console.log('dataaaaa is ....', this.brandsName)
      for(let {item,index} of this.brandsName.map((item,index) => ({item,index}))){
        if(index === 0){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'Amazon'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 1){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'Walmart'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 2){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'Ebay'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 3){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'BestBuy'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 4){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'Target'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 5){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'GROUPON'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 6){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'BuyDig'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 7){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'EpicSports'){
              this.brandsName[index] = item1;
              this.brandsName[index1] = mer;
            }
          }
        }
        else if(index === 8){
          let mer = item;
          for(let {item1,index1} of this.brandsName.map((item1,index1) => ({item1,index1}))){
            if(item1 === 'NORDSTORM'){
              this.brandsName[index] = item1.replace(item1,'NORDSTROM');
              this.brandsName[index1] = mer;
            }
          }
        }

      }
      this.HotDealsDrop = true;
      localStorage.setItem('Brands', JSON.stringify(this.brandsName));
    });
  }

  toogle() {
    this.toogleFlag = !this.toogleFlag;
  }

  navigatetohome() {
    this.router.navigate(['']);

  }

  getAllCategories() {

    return this.http.get(this.url + 'search/GetAllCategories').map(response => response.json());

  }

  verifylogin() {
    if (isPlatformBrowser(this.platformId)) {

      var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      var localtoken = currentUser.token; // your token
      this.user = currentUser.username;

      return this.http.post(this.url + 'user/api-token-verify/', {'token': localtoken})
        .map(response => {
          const token = response.json() && response.json().token;
          if (token) {
            this.flag = true;
            return true;
          } else {
            this.flag = false;
            return false;
          }
        });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      var localtoken = currentUser.token; // your token
      this.sgflag['login']=false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('type');
      localStorage.removeItem('userKey');
      localStorage.removeItem('loginUser');
      localStorage.removeItem('logintoken');
      this.router.navigate(['']);
      swal('You are Successfully Logout from SHOPnROAR','', 'success')
    }
  }

  setflag() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      this.Usertype = JSON.parse(localStorage.getItem('type')) || 0;
      if (this.currentUser != null)
        this.flag = true;
      else
        this.flag = false;
      if (this.currentUser == 0)
        this.flag = false;
      if (this.Usertype != null) {
        this.socialflag = true;
        this.sgflag['flag'] = true;
      }
      if (this.Usertype == 0) {
        this.sgflag['flag'] = false;
        this.socialflag = false;
      }
    }
  }



  Navigation(cat,subcat,subname){
    this.router.navigate(['/subcategory',cat,subcat], { queryParams: { CatName: subname} } )
  }

  hotdealnav(id){
    this.router.navigate(['/deals'], { queryParams: { DealId: id} } )

  }

  CategoryNavigation(id,category)
  {
    category = category.replace(/\s/g,'-');
    category = category.replace('&', 'and');
    category = category.replace(',', '');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }
  get_Product_Sub_Categories()
  {
    this.httpService.getProductSubCategories().subscribe(responce=>
    {
      this.getProducts_Sub = responce['Categories'];
      localStorage.setItem('Categories', JSON.stringify(this.getProducts_Sub));
    });
  }
  ngOnChanges(){
  }

  ngAfterViewInit() {
  }

  callcategories() {
    if (this.catsIsCalled === false) {
      this.catsIsCalled=true;
      this.httpC.get(this.url+'search/GetAllCategories').subscribe(
        data => {
          this.Category = data['Categories'];
          this.catsIsCalled = true;
          this.sgflag['Category'] = data['Categories'];
        },error2 => {
          this.catsIsCalled=false;
        }
      );
    }

  }

  Suggestions(query: string, page: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.url + 'search/suggestions/' + query + '/?page=' + page).map(response => response.json());
  }

  refreshlist() {
    this.listTitles = [];
  }

  filter(query) {
    if (query !== '') {
      this.Suggestions(query, 1).subscribe(
        data => {
          this.countries = data.results;
          this.listTitles = [];
          for (let item of this.countries) {
            this.listTitles.push(item.SNR_Title);
          }
        });
      this.filteredList = this.listTitles.filter(function (el) {
        return el.toLowerCase().indexOf(this.query) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item;
    this.Search();
  }

  filterquery: any;

  Search() {
    $('#closebtn').click()
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('searchedItem', JSON.stringify(this.query));
    }
    this.filterquery = this.query;
    this.query = null;
    this.listTitles = null;
    this.listTitles = this.tempTitles;
    this.router.navigate(['/result', this.filterquery, 'general']);
  }

  modelshow() {
    setTimeout(function () {
      $('#querytosearch').focus();
    }, 500);
    setTimeout(function () {
      $('#querytosearch').focus();
    }, 1200);
  }
}

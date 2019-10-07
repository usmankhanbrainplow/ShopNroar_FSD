import {Component, ChangeDetectorRef, Inject, PLATFORM_ID} from '@angular/core';
// import {HttpService} from '../http.service';
import {Router, ActivatedRoute,} from '@angular/router';
import {Headers, Http} from '@angular/http';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PagerService} from "../_services";
import {AppServices} from '../app.services';


@Component({
  selector: 'app-mobiles',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],

})

export class SearchComponent {
  Categories: any= [];
  pagecount=40;
  private url = environment.apiUrl;
  private urlapi = environment.apiUrl;
  popularcheck = false;

  filterflag=false;



  reviewCount=10;
  errorflag=false;

  bestflag=false;

  current=80;
  max=5;
  listview=false;
  gridview=true;

  options = [{'name': 'Best Match'}, {'name': 'Price: low to high'}, {'name': 'Price: high to low'}];
  selectedOption = this.options[0];

  countoptions = [{'name': 'Items per page'}, {'name': '20'}, {'name': '50'}, {'name': '100'}];
  selectedCount = this.countoptions[0];

  merchants = [{'name': 'Best Buy'}, {'name': 'Walmart'}, {'name': 'Ebay'}, {'name': 'Amazon'}, {'name': 'Groupon'}, {'name': 'Newsegg'}];

  sort: string = "Best Match";
  id;
  pageresult: any;
  lower: any;
  upper: any;
  brandresult: any;
  merchant: any;
  merchant1:any;
  category: any;
  minprice;
  maxprice;
  public GetResults:any;

  sub: any;
  objectKeys = Object.keys;
  pager:any={};
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private router: Router,
              private http: Http,
              private httpC: HttpClient,
              private httpService: AppServices, private route: ActivatedRoute, private ref: ChangeDetectorRef,
              private pagerService:PagerService) {

    this.pageresult = 1;
    this.merchant = -1;
    this.lower = -1;
    this.upper = -1;
    this.category = -1;
    this.brandresult = -1;

    //console.log(this.lower)
  }
  categoryChanged(cat){

    this.filterflag=true;
    if(cat=='null'){
      this.category=-1;

    }
    else{
      this.category=cat;

    }
    this.Allmerchants=[];
    this.AllBrands=[];
    setTimeout(() => {

      this.CountBrandsbyQuery(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category).subscribe(
        data => {

          this.Allmerchants = (data['merchants']);
          this.AllBrands = (data['brands']);
          console.log(this.AllBrands)
          //console.log(this.AllCount)
          // this.isFinish = true
        }
      );
    }, 0);

    this.Search();
  }

  public Getspecs: any[] = [];
  count: number = 0;
  query: string;
  p: any;

  pageno: any;

  searchedQuery: string;
  productpricelow: any;
  productpricehigh: any;

  public GetLaptops: any[] = [];
  Popular: any = [];

  loadmorebrands() {
    this.brandcount = this.brandcount + 10;
  }

  onChangeOption(event) {

    this.sort = event.name;
    this.pageno = 1;
    this.pageresult = this.pageno;
    this.isFinish = false;
    ////alert('vvv'+this.sort)
    this.AllSearch()
  }

  onChangeCount(event){
    this.pagecount=event.name;
    this.Search();
  }
  FilterbyMerchants(item) {
    this.merchant = item;
    this.filterflag=true;
    this.Search()
  }

  AllSearch() {

    this.queryCount(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category,this.pagecount, this.pageresult).subscribe(
      data => {
        this.count = data['totalItems'];
        this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);
        console.log(this.count)



      },
      error => {
      }
    );

    this.errorflag=false;
    {
      if (this.sort == "Best Match") {

        this.pageno = 1;
        if (this.cat == "general") {
          this.count = 0;
          this.httpService.searchGeneric(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category, this.pagecount).subscribe(
            data => {

              this.Allresults = (data['results']);
              this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);


              // ////alert('sd')
              this.errorflag=false;

              ////this.isFinish=true
            },
            error => {
              //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
              this.errorflag=true;
            }
          );

          this.searchBest(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category, this.pagecount, this.pageresult).subscribe(
            data => {

              console.log('bestmatch..................' );
              this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);

              if( this.Allresults.length==0){
                this.Allresults = (data['results'])

              }
              this.Bestresults = (data['results']);
              console.log((this.Bestresults));
              this.bestflag=true;


              // ////alert('sd')
              this.errorflag = false;

              this.isFinish = true
            },
            error => {
              this.Bestresults = []
              //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
              // this.errorflag = true;
            }
          );



        }

      }

      else if (this.sort == "Price: low to high") {

        this.pageno = 1;
        if (this.cat == "general") {
          this.httpService.searchGenericASC(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category, this.pagecount, this.pageresult, 'full').subscribe(
            data => {

              this.Allresults = (data['results']);
              this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);

              // ////alert('sd')

              ////this.isFinish=true
            },
            error => {
              //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
              this.errorflag=true;
            }
          );

        }


      }
      else if (this.sort == "Price: high to low") {
        this.pageno = 1;
        if (this.cat == "general") {
          this.count = 0;
          this.httpService.searchGenericDESC(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category, this.pagecount, this.pageresult, 'full').subscribe(
            data => {

              this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);
              this.Allresults = (data['results']);

              // ////alert('sd')
              this.errorflag=false;

              ////this.isFinish=true
            },
            error => {
              //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
              this.errorflag=true;
            }
          );


        }
      }

    }
  }

  onClickSearch() {
    this.query = this.searchedQuery;
    this.httpService.searchGenericASC(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category, this.pagecount, this.pageresult, 'full').subscribe(
      data => {

        ////////console.log(data)
        this.ref.detectChanges();
        this.ref.reattach();
      },
      error => {
        //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
        this.errorflag=true;
      }
    );

  }

filterbymerchants(merchant)
{
    this.merchant = merchant;
    this.getSearch();
}

  getSearch(){
    // if(this.brand!=='all'){
// alert(this.maxprice);
    this.httpService.GetSearchResults(this.pagecount,this.id,this.minprice,this.maxprice,this.merchant, this.sort,).subscribe(data => {
      this.GetResults = data;
      for(let item of this.GetResults){
        item['SNR_ImageURL'] = item['SNR_ImageURL'].split(',')[0];
        // console.log('imagessssssssssssssssssss', item['SNR_ImageURL'])
      }
    });
    // }
  }



  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&', 'and');
    category = category.replace(',', '');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }
  pageChanged(event) {
    this.isFinish = false;
    this.p = event;

    this.pageno = event;
    //////alert(this.sort)

    this.Search()

  }
  setPage(page: number) {
    this.pageno = page;
    this.Search();
  }


  searchbyCat(event) {
    // ////////alert("hi")
    //  ////////console.log(event);
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.srcElement.attributes.id;
    var value = idAttr.nodeValue;
    // ////////alert(value)
    // ////////alert(this.query);
    // this.query = value;
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
  }

  AllCount: any = [];
  regexp = new RegExp('^<(\\w+)>|<\\/(\\w+)>$');
  Allresults = [];
  Bestresults = [];
  Allmerchants = [];
  AllBrands = [];
  brandcount = 10;
  isFinish = false;
  num: number;
  cou: number;


  FilterbyBrands(brand) {
    this.brandresult = brand;
    this.errorflag=false;
    this.filterflag=true;
    this.Search()

  }

  resetfilters(){
    this.query = this.id;
    this.minprice= -1
    this.maxprice =-1
    this.merchant= "undefine"
    this.sort= "undefine"
    this.getSearch();
  }

  errorFlag =false;
  Qlength:any;
  Search() {
    this.Allresults=[];

    this.errorflag=false;
    this.isFinish = false;
    this.bestflag=false;

    this.count = 0;

    console.log(this.category);

    this.Qlength = this.query.split(' ');

    //alert(this.query)
    if (this.sort == "Best Match") {

      // else {



      this.searchfromebay(this.query).subscribe(
        data => {

          console.log('ebay data' + data);


          this.Allresults = this.Allresults.concat(data['results']);

          if(this.Allresults.length==0){
            this.errorflag=true;
          }
          else {
            this.errorflag = false;

          }
          console.log(this.Allresults)


        }
      );

      this.searchfromamazon(this.query).subscribe(
        data => {



          this.Allresults = this.Allresults.concat(data['results']);


          console.log("Amazon");
          console.log(this.Allresults)


        }
      );

      this.searchBest(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category,this.pagecount, this.pageresult).subscribe(
        data => {

          //console.log('data..................' + data)

          this.Allresults = this.Allresults.concat(data['results']);
          this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);

          // if(this.Allresults.length==0){
          //   this.errorflag=true;
          // }
          // else {
          //   this.errorflag = false;
          //
          // }
          // console.log(this.Allresults)


        }
      );


      this.httpService.searchGenericexact(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category,this.pagecount, this.pageresult, 'full').subscribe(
          data => {

            //console.log('data..................' + data)

            this.Allresults = this.Allresults.concat(data['results']);
            this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);

            // if(this.Allresults.length==0){
            //   this.errorflag=true;
            // }
            // else {
            //   this.errorflag = false;
            //
            // }
            // console.log(this.Allresults)


          }
        );


      this.httpService.searchGeneric(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category,this.pagecount).subscribe(
        data => {

          //console.log('data..................' + data)

          this.Allresults = this.Allresults.concat(data['results']);
          this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);

          // if(this.Allresults.length==0){
          //   this.errorflag=true;
          // }
          // else {
          //   this.errorflag = false;
          //
          // }
          //
        },
        error => {
          this.Allresults = [];
          //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
          this.errorflag = true;
        }
      );


      // this.searchBest(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category, this.pagecount, this.pageresult).subscribe(
      //   data => {
      //
      //     console.log('bestmatch..................' )
      //
      //
      //     if(this.Allresults.length==0){
      //       this.Allresults = (data['results'])
      //
      //     }
      //
      //     if(this.Allresults.length==0){
      //       this.errorflag=true;
      //       // alert(this.errorflag)
      //
      //     }
      //
      //     this.Bestresults = (data['results'])
      //     console.log((this.Bestresults))
      //     this.bestflag=true;
      //
      //
      //     // ////alert('sd')
      //
      //     this.isFinish = true
      //   },
      //   error => {
      //     this.Bestresults = []
      //     //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
      //     this.errorflag = true;
      //   }
      // );
      //

      // }

    }

    if (this.sort == "Price: high to low") {

      if (this.Qlength.length >= 3)
      {

        this.httpService.searchGenericDESC(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category, this.pagecount, this.pageresult, 'full').subscribe(
          data => {

            //console.log('data..................' + data)

            this.Allresults = (data['results']);
            this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);
            //console.log((this.Allresults))


            // ////alert('sd')
            if(this.Allresults.length==0){
              this.errorflag=true;
            }
            else {
              this.errorflag = false;

            }



            this.isFinish = true
          },
          error => {
            this.Allresults = [];
            //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
            this.errorflag = true;
          }
        );

      }
    }
    if (this.sort == "Price: low to high") {
      // if (this.Qlength.length <3)
      {

        this.httpService.searchGenericASC(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category, this.pagecount, this.pageresult, 'full').subscribe(
          data => {

            //console.log('data..................' + data)

            this.Allresults = (data['results']);
            this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);
            //console.log((this.Allresults))


            // ////alert('sd')
            if(this.Allresults.length==0){
              this.errorflag=true;
            }
            else {
              this.errorflag = false;

            }


            this.isFinish = true
          },
          error => {
            this.Allresults = [];
            //console.log('sdfsdfsdfsdfsdfsd   ', error.status)
            this.errorflag = true;
          }
        );

      }
    }
    this.queryCount(this.query, this.lower, this.upper, this.brandresult, this.merchant, this.category,this.pagecount, this.pageresult).subscribe(
      data => {
        this.count = data['totalItems'];
        this.pager = this.pagerService.getPager(data['totalItems'], this.pageresult,this.pagecount);
        console.log(this.count)



      },
      error => {
      }
    );


  }

  pagetogo = 1;

  loadmore(event) {

    this.pagetogo = this.pagetogo + 1;
    this.httpService.getpopular(this.pagetogo).subscribe(
      data => {
        const myArray = [];


        this.Popular = data
      }
    );
    this.ref.detectChanges();
    this.ref.reattach();

  }


// onClick(event) {
//     ////////console.log(event);
//     ////////console.log(event.srcElement.attributes.id);
//     var idAttr = event.srcElement.attributes.id;
//     var value = idAttr.nodeValue;
//      localStorage.setItem('divValue', JSON.stringify(value));
//  //  ////////alert(value);
// }
  cat: any;
  flag = false;
  title: any;
  user: any;
  AllCatCount: any = [];


  listviewflag = false;
  gridviewflag = true;

  // listview() {
  //   this.listviewflag = true;
  //   this.gridviewflag = false;
  // }

  listviewfun(){
    this.listview=true;
    this.gridview=false;
  }
  gridviewfun(){
    this.listview=false;
    this.gridview=true;
  }

  // gridview() {
  //   this.listviewflag = false;
  //   this.gridviewflag = true;
  // }

  productfilter = false;

  ProductPrice(low: any, high: any) {

    this.filterflag = true;
    this.isFinish = false;


    this.productpricelow = low;
    this.productpricehigh = high;

    this.lower = low;
    this.upper = high;

    this.Search();

  }
  Pricefilters(minprice , maxprice ) {
    this.minprice = minprice;
    this.maxprice = maxprice;
    this.getSearch();
  }

  spellcorrection:any;
  ngOnInit() {
    this.Categories = JSON.parse(localStorage.getItem('Categories'));
    // this.httpService.getTrendsGame(1, 'full').subscribe(
    //   data => {
    //
    //
    //     this.Popular = data
    //
    //     this.popularcheck = true
    //   }
    // );
    // this.verifylogin().subscribe()
    if (isPlatformBrowser(this.platformId)) {

      window.scrollTo(0, 0)
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
//       this.httpC.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyBo0J96Ie4hZ_xfpGdFt8u8hFJyJWYnsvQ&cx=017576662512468239146:omuauf_lfve&q='+this.id).subscribe(data=>{
//         try {
//
//           this.spellcorrection=true;
//           this.query=(data['spelling']['correctedQuery'])
//           // //alert(this.query)
//           this.Search();
//
//           this.CountbyQuery(this.query).subscribe(
//             data => {
//
//               this.AllCount = data;
//               //console.log(this.AllCount)
//
//               //console.log(this.objectKeys(this.AllCount))
//             }
//           );
//
//         }
//         catch {
//           this.spellcorrection=false;
//
// //console.log('already corrected')
//           this.query = this.id;
//           this.Search();
//
//           this.CountbyQuery(this.query).subscribe(
//             data => {
//
//               this.AllCount = data;
//               //console.log(this.AllCount)
//
//               //console.log(this.objectKeys(this.AllCount))
//             }
//           );
//
//         }
//         // //alert('data')
//       })
      this.query = this.id;
      this.minprice= -1
      this.maxprice =-1
      this.merchant= "undefine"
      this.sort= "undefine"
      this.getSearch();
      this.Search();
      // localStorage.setItem('search_value',this.id);

      this.CountbyQuery(this.query).subscribe(
        data => {

          this.AllCount = data;
          //console.log(this.AllCount)

          //console.log(this.objectKeys(this.AllCount))
        }
      );


      this.cat = params['cat'];
      //  ////////alert(this.cat)
//  ////////alert(this.query)
      this.isFinish = false;
      this.selectedOption = this.options[0];
      // this.cat="mobile"
      this.isFinish = false;
      this.errorflag=false;



      setTimeout(() => {

        this.CountBrandsbyQuery(this.query, this.lower, this.upper, this.brandresult, this.merchant,this.category).subscribe(
          data => {

            this.Allmerchants = (data['merchants']);
            this.AllBrands = (data['brands']);

            console.log(this.AllBrands)
            //console.log(this.AllCount)
            // this.isFinish = true
          }
        );
      }, 200);
      setTimeout(() => {
        this.httpService.getTrendsToy(1, 'full').subscribe(
          data => {


            this.Popular = data
          }
        );
      }, 300)

    });



  }

  CountbyQuery(query: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
////console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url + 'search/countQuery/' + query).map(response => response.json());

  }


  CountBrandsbyQuery(query: string, lower: any, upper: any, brand: any, merchant: any,category:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
////console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.http.get(this.url + 'search/CountallproductsBrandMerchants/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category).map(response => response.json());

  }

  private ngOnDestroy() {
    // ////////alert("no")
    this.sub.unsubscribe();
  }
  setQuery(){
    this.query=this.id;
    this.Search()
  }

  searchBest(query: string, lower: any, upper: any, brand: any, merchant: any,category:any, count:any, page: any) {

    console.log(query);
    let headers = new Headers();

    console.log(lower);
    console.log(upper);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterallproductsbestmatch/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category  + '/?count='+count+'&page=' + page,).map(response => response.json());

  }

  queryCount(query: string, lower: any, upper: any, brand: any, merchant: any,category:any, count:any, page: any) {

    console.log(query);
    let headers = new Headers();

    console.log(lower);
    console.log(upper);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/filterallproductsCount/' + query + '/' + lower + '/' + upper + '/' + brand + '/' + merchant+ '/' + category  + '/?count='+count+'&page=' + page,).map(response => response.json());

  }
  bestmatch(){
    this.Allresults=this.Bestresults;
    console.log(this.Allresults)
  }
  searchfromebay(query: string) {

    console.log(query);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/findsearchedproducts_ebay/' + query + '/' ).map(response => response.json());

  }

searchfromamazon(query: string) {

    console.log(query);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'search/findsearchedproducts_amazon/' + query + '/' ).map(response => response.json());

  }




  getalpha(event:string){
    //console..log(event)
    // alert(event)
    return event[0].substring(0,1)
  }
}

import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {HttpService} from '../http.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SimpleGlobal} from 'ng2-simple-global';
import {Headers, Http} from '@angular/http';

import {isPlatformBrowser} from '@angular/common';
import {AlertService, AuthenticationService} from '../_services/index';
import {review} from '../reviewModel/review';
import {environment} from '../../environments/environment';
import Drift from 'drift-zoom';
import {Pipe, PipeTransform} from "@angular/core";
// import {Chart} from 'angular-highcharts';
import {DOCUMENT} from "@angular/platform-browser";
// import {DeviceDetectorService} from "ngx-device-detector";
import swal from 'sweetalert'
import {AppServices} from '../app.services';
// import any = jasmine.any;
// import any = jasmine.any;
declare var $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [AppServices, AuthenticationService, AlertService]
})

@Pipe({name: 'round'})
export class ProductDetailsComponent implements OnInit {
  private urlapi = environment.apiUrl;


  reviewCount = 10;
  productLink: any;
  productPrice: any;
  width = 700;
  height = 500;
  left = 500;
  top = 40;
  proId:any;
  ProductResulted: any= {};
  errorflag: any;
  check_data:boolean =false;
  current = 80;
  max = 100;
  newoverallratting = 85;
  newoverallratting1 = 92;
  newoverallratting2 = 83;
  overallrating = 50;
  overallStarrating = 60 / 20;
  vendorSinglereviews: review;
  graph = false;
  options = [{'name': 'Best Match'}, {'name': 'Price: low to high'}, {'name': 'Price: high to low'}];
  selectedOption = this.options[0];
  sort: any;
  price: any;
  merchantName:any;
  priceprcent: any;
  chartCategories = ['general', 'quality', 'price'];
  positiveseries = [75, 80, 90];
  negativeseries = [20, 18, 5];
  neutralseries = [5, 2, 5];
  sliderFlag = false;
  // chartCategories=['General','Price','Weight']

  chart: any;


  color = 'primary';
  colorwarn = 'warn';
  mode = 'determinate';
  value = 80;
  public pieChartLabels:string[] = ['Positive', 'Neutral', 'Negative'];
  public pieChartData:number[] =  [75, 20, 5];
  public pieChartData1:number[] = [80, 18, 2];
  public pieChartData2:number[] = [90,  5, 5];
  public pieChartType:string = 'pie';
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: ['#00b729','#0000ff','#ff0000'],
      // borderColor: 'rgba(0, 0, 0, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor:  ['rgba(0, 255, 0, 0.3)','rgba(0, 0, 255, 0.3)','rgba(255, 0, 0, 0.3)'],
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  percentage = -25;

  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

  // creategraph(chartCategories: any) {
  //   this.chart = new Chart({
  //     chart: {
  //       type: 'column'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     title: {
  //       text: 'SHOPnROAR Feature Ranking AI (Based on Real Reviews)',
  //       style: {
  //         fontWeight: 'bold',
  //         fontSize: '15px',
  //         padding: '10px'
  //
  //       }
  //     },
  //     xAxis: {
  //       categories: chartCategories,
  //       labels: {
  //         style: {
  //           fontSize: '20px',
  //           textTransform: 'capitalize'
  //         }
  //       }
  //     },
  //     yAxis: {
  //       min: -100,
  //       max: 125,
  //       title: {
  //         text: 'Reviews Ratings: Favorable/Negative Breakdown',
  //         style: {
  //           fontSize: '15px',
  //           textTransform: 'capitalize',
  //           color: 'black'
  //         }
  //       },
  //       stackLabels: {
  //         enabled: true,
  //         style: {
  //           fontWeight: 'bold',
  //           fontSize: '18px'
  //
  //         }
  //       }
  //     },
  //     tooltip: {
  //       headerFormat: '<b>{point.x} </b><br/>',
  //       pointFormat: '{series.name}: {point.y} %<br/>Total: {point.stackTotal} %'
  //     },
  //     legend: {
  //       align: 'right',
  //       x: -30,
  //       verticalAlign: 'top',
  //       y: 25,
  //       floating: true,
  //
  //       borderColor: '#CCC',
  //       borderWidth: 1,
  //       shadow: false
  //     },
  //     plotOptions: {
  //       column: {
  //         dataLabels: {
  //           enabled: true,
  //           format: '{point.y} %'
  //         }
  //       }
  //     },
  //     series: []
  //   });
  // }

  // getReviewsai(item) {
  //   //console.log(item)
  //   this.http
  //     .get(this.urlapi + 'products/filterReviewAI/' + item + '/')
  //     .subscribe(data => {
  //         this.ReviewsAI = data;
  //         console.log(this.ReviewsAI);
  //         //console.log (this.ReviewsAI.results[0].Reviews_AI.total_score)
  //         this.overallrating = Math.floor(this.ReviewsAI.results[0].Reviews_AI.total_score);
  //         this.overallStarrating = Math.ceil(this.overallrating / 20);
  //
  //
  //         this.chartCategories = []
  //         this.negativeseries = []
  //         this.positiveseries = []
  //         this.neutralseries = []
  //         for (let aspects of this.ReviewsAI.results[0].Reviews_AI.results) {
  //           console.log(aspects.name);
  //           this.chartCategories.push(aspects.name);
  //           this.positiveseries.push(aspects.score[0]);
  //           this.negativeseries.push(-aspects.score[1]);
  //           this.neutralseries.push(aspects.score[2])
  //         }
  //
  //         this.creategraph(this.chartCategories);
  //
  //         this.chart.addSerie({
  //           name: 'Positive',
  //           data: this.positiveseries,
  //           color: '#53c722'
  //
  //         });
  //         this.chart.addSerie({
  //
  //           name: 'Negative',
  //           data: this.negativeseries,
  //           color: '#BB1228'
  //         });
  //         this.chart.addSerie({
  //           name: 'Neutral',
  //           data: this.neutralseries,
  //           color: '#20879D'
  //
  //         });
  //
  //
  //         this.graph = true;
  //       },
  //       error => {
  //       }
  //     );
  // }

  doSomethingWithCurrentValue($event) {
    //console.log(event)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  transform(value: number): number {
    return Math.round(value);
  }

  loadmorereviews() {
    this.reviewCount = this.reviewCount + 10;
  }

  public loadScript() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  AddtoWatchList(id){
    this.httpService.AddtoWatchlist(this.proId).subscribe(
      data => {
        swal('Successfully Added to your Wishlist','', 'success')
        //console.log(this.products);
      }
    );
    console.log('Product is added...' , this.proId);
  }

  onChangeOption(event) {
    if (event.name == 'Best Match') {
      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      while (this.i < 6) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }

      this.i = 0;
      // alert(this.Q +'best match')
      this.httpService.ProductsComparison(this.title).subscribe(
        data => {
          this.GetGroupspecs = data;
          this.Allproductsresults = (data['results']);
          this.errorflag = false
          this.Getspecs = data;
        }
      );
    }
    if (event.name == 'Price: low to high') {
      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      while (this.i < 6) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }

      this.i = 0;
      // alert(this.Q)
      this.httpService.searchGenericASC(this.Q, -1, -1, -1, -1, -1, 36, 1, 'full').subscribe(
        data => {
          this.GetGroupspecs = data;
          this.Allproductsresults = (data['results']);
          this.errorflag = false
          this.Getspecs = data;

          ////
          this.Allproductsresults.sort(function (a, b) {
            if (a.SNR_Price < b.SNR_Price) {
              return -1
            }
            else if (a.SNR_Price > b.SNR_Price) {
              return 1
            }
            else {
              return 0
            }
          })


          //////////
        }
      );

    }

    if (event.name == 'Price: high to low') {
      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      while (this.i < 6) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }

      this.i = 0;
      // alert(this.Q)
      this.httpService.searchGenericDESC(this.Q, -1, -1, -1, -1, -1, null, 1, 'full').subscribe(
        data => {
          this.GetGroupspecs = data;
          this.Allproductsresults = (data['results']);
          this.errorflag = false
          this.Getspecs = data;
        }
      );

    }
  }

  getValue(event) {
    // //alert(event)
    this.star = event;
    // //alert(this.star)
  }

  msgflag = false;
  star = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private httpService: AppServices,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              // private deviceService: DeviceDetectorService,
              @Inject(DOCUMENT) private document: any,
              public sgflag: SimpleGlobal,
              private httpC: Http,
              private http: HttpClient,
              public router: Router) {

    this.vendorSinglereviews = {
      review: 'none',
      vendorName: 'none'
    }
    // this.epicFunction();

  }

  // epicFunction() {
  //   // console.log('hello `Home` component');
  //   // this.deviceInfo = this.deviceService.getDeviceInfo();
  //   // console.log(this.deviceInfo);
  //   // alert(this.deviceInfo)
  // }


  sub: any;
  modelNo: any;
  AllresultsCheck = false;

  totalreview: any;
  Getspecs: any = [];
  GetsReviews: any = [];
  Reviewflag: any;
  Reviews: any = {
    "results": [
      {
        "Reviews": [
          {
            "SNR_Review_Title": "Great product! Thanks",
            "SNR_Review_Author": "puntoagencia",
            "SNR_Review_Body": "",
            "SNR_Review_Stars": 5,
            "SNR_Review_UP": 3,
            "SNR_Review_Down": 0,
            "SNR_IS_SNR": false
          },
          {
            "SNR_Review_Title": "Recommended to buy",
            "SNR_Review_Author": "colorfulworldprinting",
            "SNR_Review_Body": "Perfect to buy",
            "SNR_Review_Stars": 5,
            "SNR_Review_UP": 4,
            "SNR_Review_Down": 0,
            "SNR_IS_SNR": false
          },
          {
            "SNR_Review_Title": "Average! ",
            "SNR_Review_Author": "colorfulworldprinting",
            "SNR_Review_Body": "Perfect to buy",
            "SNR_Review_Stars": 5,
            "SNR_Review_UP": 3,
            "SNR_Review_Down": 0,
            "SNR_IS_SNR": false
          }
        ],
        "SNR_Title": "100% Original and New Roland DX4 Eco Solvent Printhead- 1000002201",
        "SNR_Available": "Ebay",
        "SNR_ProductURL": "https://www.ebay.com/itm/100-Original-and-New-Roland-DX4-Eco-Solvent-Printhead-1000002201/172369910491?epid=3004517991&hash=item28220c1adb:g:GWUAAOSwOyJX-zV-"
      }
    ]
  }


  ReviewsAI: any = [];
  GetVendorReviews: any = [];


  GetGroupspecs: any = [];
  name: string;
  description = '';
  merchant:any;
  priceofproduct: any;
  ProductURL: any;
  image = "img";
  isCheck = false;
  image1 = "img";
  image2 = "img";
  GetLaptops: any = [];
  images_pro:any=[]
  image3 = "img";
  pagetogo = 1;
  pagetogoproducts = 1;

  Popular: any = [];
  model: any = {};
  mail: string;
  naam: any;
  vendorReviews: any;
  Q: any;
  link: string;
  count = 1;
  temp: string;

  sendMail() {
    this.temp = this.title.replace(' ', '%20');
    this.temp = this.temp.replace(' ', '%20');
    this.temp = this.temp.replace(' ', '%20');
    this.temp = this.temp.replace(' ', '%20');

    //////console.log(this.temp)
    this.link = 'www.shopnroar.com/details?Model=' + this.modelNo + '&Name=' + this.temp;
    //////console.log(this.link)
    this.mail = this.model.email;
    // //alert(this.mail)
    this.httpService.sendLinkMail(this.mail, this.link).subscribe();

  }

  show() {
    this.isCheck = !this.isCheck;
    // //alert(this.isCheck)

  }

  brand: string;
  productID: string;
  productURL: string;
  upc: string;
  descr: string;
  i = 0;

  imgCount = 1;

  setImag(img) {
    if (this.imgCount < 4) {

      if (this.imgCount == 1) {
        this.image1 = img;
      }
      if (this.imgCount == 2) {
        this.image2 = img;
      }
      if (this.imgCount == 3) {
        this.image3 = img;
      }
      this.imgCount = this.imgCount + 1;
    }

  }

  search() {
    {
      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      if (this.naam.length < 5) {
        while (this.i < this.naam.length) {
          this.Q = this.Q + ' ' + this.naam[this.i];
          this.i = this.i + 1;
        }
      }

      if (this.naam.length > 5) {
        while (this.i < this.naam.length / 2) {
          this.Q = this.Q + ' ' + this.naam[this.i];
          this.i = this.i + 1;
        }
      }

      this.i = 0;


      this.httpService.searchGenericexact(this.Q, -1, -1, -1, -1, -1, null, -1, 'full').subscribe(
        data => {
          this.Allproductsresults = this.Allproductsresults.concat(data['results'])
          this.errorflag = false
          this.check_data=true;
          this.productID = this.Getspecs['results'][0]['id'];

          // alert('asdasd')
          try {
            this.image = data['results'][0]['SNR_ImageURL'];
            this.description = data['results'][0]['SNR_Description'];
            // this.priceofproduct = data['results'][0]['SNR_Price'];

          } catch (e) {
            // this.image1 = this.Getspecs['results'][1]['SNR_ImageURL']

          }


        });
      // alert(this.Q)
      this.ProductsComparison(this.title).subscribe(
        data => {
          this.GetGroupspecs = data;
          this.Allproductsresults = this.Allproductsresults.concat(data['results'])
          this.errorflag = false

          this.image = data['results'][0]['SNR_ImageURL'];


          this.Allproductsresults.sort(function (a, b) {
            if (a.SNR_Price < b.SNR_Price) {
              return -1
            }
            else if (a.SNR_Price > b.SNR_Price) {
              return 1
            }
            else {
              return 0
            }
          })

          // this.Allproductsresults = (data['results']);
          this.Getspecs = data;


          //console.log('image')
          //console.log(this.image3)

          // //////console.log(data)
          this.name = (this.Getspecs['results'][0]['SNR_Title']);
          this.productURL = (this.Getspecs['results'][0]['SNR_ProductURL']);

          this.description = this.Getspecs['results'][0]['SNR_Description'];

          var re = /<(\w+)>|<\/(\w+)>/g;

          this.description = this.description.replace(re, '');
          // this.description=this.description.replace('</li>','')

          this.image = this.Getspecs['results'][0]['SNR_ImageURL'];
          try {
            this.upc = this.Getspecs['results'][0]['SNR_UPC'];
            this.brand = this.Getspecs['results'][0]['SNR_Brand'];

          }
          catch (e) {

          }


          // if (!this.image2) {
          //   this.image1 = this.GetGroupspecs['results'][0]['SNR_ImageURL'];
          //   this.image2 = this.GetGroupspecs['results'][1]['SNR_ImageURL'];
          //   this.image3 = this.GetGroupspecs['results'][2]['SNR_ImageURL']
          //
          // }

// //////console.log(this.GetGroupspecs)
        }
      );
      // //alert(this.naam)
      // this.Q=this.title.substring(0,13)


      this.naam = this.title.split(' ');
      this.i = 1;

      this.Q = "";
      this.Q = this.naam[0];

      // if(this.naam.length<5){
      while (this.i < 3) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }
      // }
      //
      // if(this.naam.length>5){
      //   while (this.i < this.naam.length/3) {
      //     this.Q = this.Q + ' ' + this.naam[this.i];
      //     this.i = this.i + 1;
      //     console.log(this.Q)
      //   }
      // }

      this.i = 0;

//similar products
//       alert(this.Q)
      this.httpService.searchGeneric(this.Q, -1, -1, -1, -1, -1, null).subscribe(
        data => {

          this.Allresults = (data);
          if (this.Allresults.results.length > 0) {
            this.AllresultsCheck = true;
          }

        });


    }

  }

  flag = false;


  title: any;
  url: any;
  user: any;
  Allresults: any = {};
  Allproductsresults = [];
  Allproductsresultsgroupon = [];
  WishCheck:boolean;

  // pagetogo = 1;

  loadmoreproducts() {
    this.pagetogoproducts = this.pagetogoproducts + 1;

    if (this.modelNo !== 'Visit site to see' && this.modelNo !== '00' && this.modelNo !== 'null') {

      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      while (this.i < 6) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }

      this.i = 0;
      this.httpService.ProductsComparison(this.title).subscribe(
        data => {

          this.GetGroupspecs = data;
          if (data['totalPages'] > this.pagetogoproducts) {
            this.msgflag = false;

            this.Allproductsresults = this.Allproductsresults.concat(data['results'])
            this.errorflag = false



          }

          else {
            this.msgflag = true
          }
// //////console.log(this.GetGroupspecs)
        }
      );


    }
    else {


      this.naam = this.title.split(' ');
      this.i = 1;
      this.Q = this.naam[0];
      while (this.i < 6) {
        this.Q = this.Q + ' ' + this.naam[this.i];
        this.i = this.i + 1;
      }

      this.i = 0;
      // //alert(this.Q)
      this.ProductsComparison(this.title).subscribe(
        data => {

          this.Getspecs = data;
          if (data['totalPages'] > this.pagetogoproducts) {
            this.msgflag = false;
            this.Allproductsresults = this.Allproductsresults.concat(data['results']);
            this.errorflag = false

            this.name = (this.Getspecs['results'][0]['SNR_Title']);
            this.description = this.Getspecs['results'][0]['SNR_Description'];
            this.image = this.Getspecs['results'][0]['SNR_ImageURL'];

            this.image1 = this.Getspecs['results'][1]['SNR_ImageURL'];
            this.image2 = this.Getspecs['results'][2]['SNR_ImageURL'];
            this.image3 = this.Getspecs['results'][3]['SNR_ImageURL']

          }
          else {
            this.msgflag = true
          }
        }
      );
    }

  }

  substr = 3;

  loadmore() {
    this.pagetogo = this.pagetogo + 1;

    if (this.substr > 0) {
      this.Q = this.Q.substring(0, 13 - this.substr);
      this.httpService.searchGeneric(this.Q, -1, -1, -1, -1, null, -1).subscribe(
        data => {
          this.Allresults = this.Allresults.concat(data)

        });
      this.substr = this.substr - 3;
    }


  }

  titletoadd: string;
  reviewtoadd: string;
  submit: any;
  totalReviews: any;
  revimsg = '';

  addreview() {
    this.submit = false;
    this.revimsg = "Posting..."
    this.titletoadd = this.model.title;
    this.reviewtoadd = this.model.review;
    if (this.titletoadd != null && this.reviewtoadd != null) {
      if (this.star != 0) {
        this.httpService.Add_Review(this.user, this.productID, this.star, this.titletoadd, this.reviewtoadd).subscribe(data => {
          this.submit = true;
          this.revimsg = "Your review will be updated soon."
          this.model.title = '';
          this.model.review = '';
          var rev;
          this.naam = this.title.split(' ');
          this.i = 1;
          rev = this.naam[0];
          while (this.i < 2) {
            rev = rev + ' ' + this.naam[this.i];
            this.i = this.i + 1;
          }

          this.getReviews(rev);

        }, error => {
          this.revimsg = "Something went wrong."

        });

      }
      else {
        this.revimsg = "Please select star rating"

      }
    }
    else {
      this.revimsg = "Please add review"

    }

  }

  loading = true;
  loginID: any;
  status: any;

  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
          data => {
            this.sgflag['login'] = true;

            // //alert('Loged In');
            // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // var token = currentUser.token; // your token
            // // //alert(token)
            // this.router.navigate(['']);
            var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
            var token = currentUser.token; // your token
            this.user = currentUser.username;


            this.flag = true;

            this.authenticationService.loginID(this.model.username).subscribe(
              data => {
                this.loginID = data;
                this.status = true;
                localStorage.setItem('userKey', JSON.stringify(data[0].id));
              }
            )
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
            this.status = false

          });

    }
  }

  verifylogin() {
    if (isPlatformBrowser(this.platformId)) {


    }
  }

  fbsharelink = 'https://www.facebook.com/sharer/sharer.php?u=';
  public mini: any;
  public mini2: any;
  public mini3: any;
  // deviceInfo = null;

// link='http://www.shopnroar.com/';
  zoomingFunc(id){
    var demoTrigger = document.querySelector('.demo-trigger'+id);
    var paneContainer = document.querySelector('.detail');

    new Drift(demoTrigger, {
      paneContainer: paneContainer,
      inlinePane: false,
    });

    switch (id) {
      case 0:{
        demoTrigger.setAttribute("data-zoom", this.images_pro[0]);
        break
      }
      case 1:{
        demoTrigger.setAttribute("data-zoom", this.images_pro[1]);
        break
      }
      case 2:{
        demoTrigger.setAttribute("data-zoom", this.images_pro[2]);
        break
      }
      case 3:{
        demoTrigger.setAttribute("data-zoom", this.images_pro[3]);
        break
      }
    }
  }


  ngOnInit() {

    this.mini= this.randomIntFromInterval(70,90);
    this.mini2 = this.randomIntFromInterval(80,95);
    this.mini3 = this.randomIntFromInterval(85,90);

    console.log('random numer is .....', this.mini);
    this.AddtoWatchList(this.proId);
    this.Reviewflag = true;
    //
    // this.creategraph(this.chartCategories)
    // this.chart.addSerie({
    //   name: 'Positive',
    //   data: this.positiveseries,
    //   color: '#53c722'
    //
    // });
    // this.chart.addSerie({
    //
    //   name: 'Negative',
    //   data: this.negativeseries,
    //   color: '#BB1228'
    // });
    // this.chart.addSerie({
    //   name: 'Neutral',
    //   data: this.neutralseries,
    //   color: '#20879D'
    //
    // });
    this.graph = true;

    // alert(this.sgflag['login'])

    this.loadScript();

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(()=> {
        this.zoomingFunc(0);
      },2000);
      window.scrollTo(0, 0)
    }
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.modelNo = params['Model'] || 0;
        this.proId = params['ID'] || 0;
        this.title = params['Name'] || 0;
        this.price = params['Price'] || 0;
        this.priceprcent = this.price / 4;
        // alert(this.priceprcent)
        this.url = params['URL'] || 0;
        this.fbsharelink = 'https://www.shopnroar.com/details?Name=' + this.title + '&Model=' + this.modelNo;
        this.getDetail();
        // alert('shopnroar://shopnroar.com/details?title='+this.title)

        // if (this.deviceInfo.device.toLowerCase() == "iphone" || this.deviceInfo.device.toLowerCase() == "ipad") {
        //   // alert('shopnroar://shopnroar.com/login?name='+id+'&id='+token)
        //   this.document.location.href = 'shopnroar://shopnroar.com/details?title=' + this.title;
        //
        // }

        // alert(this.fbsharelink)
        if (this.modelNo == 0 && this.title == 0 && this.url == 0) {
          this.errorflag = true;
        }

        try {
          // this.title=this.title.replace('#',' ');
          // this.title=this.title.replace('\'',' ')

        }
        catch (ex) {


        }

        // this.link=this.link+this.modelNo+'/'+this.title+'/'+this.url


      });





    localStorage.setItem('Recommendation', JSON.stringify(this.title));

    this.link = 'www.shopnroar.com/details?Model=' + this.modelNo + '&Name=' + this.title;
    var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
    if (currentUser !== 0) {
      this.user = currentUser.username;
      // alert('already logged in..')
      this.flag = true
    }
    this.search();
    var rev;
    this.naam = this.title.split(' ');
    this.i = 1;
    rev = this.naam[0];
    while (this.i < 2) {
      rev = rev + ' ' + this.naam[this.i];
      this.i = this.i + 1;
    }
    this.getReviews(rev);
    // this.getReviewsai(rev);
  }
  getDetail(){
      this.httpService.getProductByID(this.proId).subscribe(data => {

        this.ProductResulted = data;
        // console.log('Data issss', this.ProductResulted);
        this.images_pro = this.ProductResulted['SNR_ImageURL'].split(',')
        this.merchantName = this.ProductResulted['SNR_Available'];
        console.log('Merhchant name is', this.merchantName)
        this.productPrice = this.ProductResulted['SNR_Price'];
        // console.log('Price of the product is...' , this.productPrice);
        this.productLink = this.ProductResulted['SNR_ProductURL'];
        this.CheckWatchList();
      });
  }
  CheckWatchList(){
    this.httpService.CheckWishList(this.ProductResulted['SNR_ProductURL']).subscribe(data => {
      this.WishCheck = data['status'];
      console.log('product add to wish list status is...', this.WishCheck)
    });
  }
  AddToWatchList(){
    this.httpService.Addwishlist(this.ProductResulted).subscribe(data => {
      swal('Successfully Added to your Wishlist','', 'success');
      if(data[0]['json']['status'] === 'Item already in wishlist'){
        swal('Item Already Exist in Wishlist','','error');
      }
      this.CheckWatchList();


    });
  }
  randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  RemoveFromWatchList(){
    this.httpService.Unwatch(this.ProductResulted['SNR_ProductURL']).subscribe(data =>{
      swal('Successfully Removed to your Wishlist','', 'success');
      this.CheckWatchList();
      // this.WishCheck= false;
      // if(data['Description']=== 'Item Deleted'){
      //   this.WishCheck = !this.WishCheck;
      // }
    })
  }

  getReviews(item) {
    //console.log(item)
    this.http
      .get(this.urlapi + 'products/filterReview/' + item + '/')
      .subscribe(data => {
          this.Reviews = data;
          if (this.Reviews.results.length == 0) {
            this.Reviewflag = false;

          }
          else {
            this.Reviewflag = true;

          }
          // alert(this.Reviewflag)
        },
        error => {
          this.Reviewflag = false;
        }
      );
  }

  Add_Review(user: string, pid: string, star: any, title: string, review: string,) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.urlapi + 'review/add', {
        "SNR_Review_Title": title,
        "SNR_Review_Author": user,
        "SNR_Review_Body": review,
        "SNR_Review_Stars": star,
        "Product": pid
      },
      {}).subscribe(data => {
        //console.log ('data'+data)
      },
      error => {

      }
    );


  }

  ProductsComparison(query: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
//console.log('https://localhost:8000/mobile/filtermobile/'+query)
    return this.httpC.get(this.urlapi + 'search/filterproductComparison/' + query).map(response => response.json());

  }

  loginredirect() {

    this.sgflag['redirectModel'] = this.modelNo
    this.sgflag['redirectName'] = this.title
    // localStorage.setItem('redirectURL' , JSON.stringify(this.router.url ));

    this.router.navigate(['login'])

  }
}

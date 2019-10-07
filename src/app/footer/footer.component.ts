import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SimpleGlobal} from 'ng2-simple-global';
import { DataSharedService } from "../shareddata.service";
import {AppServices} from '../app.services';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [AppServices,DataSharedService]

})
export class FooterComponent implements OnInit, OnChanges {
  model: any = {};
  status: any;
  private url = environment.apiUrl;

  public Category = [];

  AllCategories: any = [];
  count=0;

  constructor(private httpService: AppServices,
              public sgflag: SimpleGlobal, private router: Router,
              private dataShared: DataSharedService,
              public httpClient: HttpClient) {
  }

  subscribe() {

    this.httpService.Add_Subscriber(this.model.email).subscribe((res) => {
        this.status = true;

      },
      error => {
        this.status = false;
      });

  }

  CategoryNavigation(id,category){
    category = category.replace(/\s/g,'-');
    category = category.replace('&', 'and');
    category = category.replace(',', '');
    this.router.navigate(['/view',id], { queryParams: { CatName: category} } )
  }

  callcontact() {

    this.router.navigate(['/contact']);

  }

  callabout() {
    this.router.navigate(['/about']);

  }

  callwork() {
    this.router.navigate(['/howshopnroarworks']);

  }

  calllogin() {

    this.router.navigate(['/login']);

  }

  callproducts() {

    this.router.navigate(['/view', 'laptop']);

  }

  callsignup() {

    this.router.navigate(['/register']);

  }

  callprivacy() {

    this.router.navigate(['/policy']);

  }

  calltermsofcondition() {

    this.router.navigate(['/termsofcondition']);

  }

  callhome() {

    this.router.navigate(['/hotdeals']);

  }

  loadcats(){
    this.Category = this.sgflag['Category'];
  }
  message:string;
  ngOnInit() {

    this.model.email = '';

      this.AllCategories = JSON.parse(localStorage.getItem('Categories'));



    this.dataShared.currentMessage.subscribe(message => this.message = message)

  }
  newMessage() {


  }

  ngOnChanges(){
    this.loadcats()
  }


}

import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
// import { HttpService } from '../http.service';
import { Http} from '@angular/http';
import { isPlatformBrowser } from '@angular/common';
// import {RecaptchaComponent} from "recaptcha-blackgeeks";

import swal from 'sweetalert';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {AppServices} from '../app.services';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],

})
export class ContactComponent implements OnInit {

  // @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  data:any=[]
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private httpService: AppServices,   private http: Http) {

   }

  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

  flag=false;
  Recaptcha =true;
  title:any;
  url:any
  flaag=false;
  user:any;
  model: any = {};
  userFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex),
    Validators.maxLength(100)
  ]);

  sendfeedback(){
    // this.Recaptcha = this.captcha.getResponse();
    console.log('recaptcha issssssssssssss', this.Recaptcha)
    setTimeout(()=>{
      // if(this.Recaptcha) {
      this.httpService.Add_Feedback(this.model.name, this.model.email, this.model.subject, this.model.feedback).subscribe(data =>{
        this.model.name = '';
        this.model.email = '';
        this.model.subject = '';
      });
      this.model.feedback='';
      this.flaag=true
    // }
  // else {
  //     swal('Recaptcha is required','','error')
  //     this.Recaptcha = false;
  //   }
    },1000)

  }


  ngOnInit() {
    // this.verifylogin().subscribe()
    if (isPlatformBrowser(this.platformId)) {

      window.scrollTo(0, 0)

    }
  }
}

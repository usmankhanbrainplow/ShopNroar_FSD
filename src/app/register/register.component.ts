import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {isPlatformBrowser} from '@angular/common';
import {AlertService, UserService} from '../_services/index';
import swal from 'sweetalert';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "../_services";
import {SimpleGlobal} from "ng2-simple-global";
// import { RecaptchaComponent } from 'recaptcha-blackgeeks';
import {RecapchaService} from "../recapcha/recapcha.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService,AuthenticationService, AlertService,AuthService]
})
export class RegisterComponent implements OnInit {
  // @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  model: any = {};
  loading = false;
  Userloading = false;
  emailloading = false;
  UserError;
  emailError;
  hide = true;
  currentUser : any;
  passwrodmatch: boolean = true;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  recaptcha=true;
  status:any;
  loginID: any = []
  private loggedIn: boolean;
  private url = environment.apiUrl;
  private user: SocialUser;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex),
    Validators.maxLength(100)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(10),
    Validators.maxLength(30)
  ]);
  captchaFormControl = new FormControl('', [
    Validators.required]);
  resolved(captchaResponse: string) {
    this.recaptcha= true;
  }
  constructor(private http: Http,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              public sgflag: SimpleGlobal,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private recap:RecapchaService) {
  }
  checkmail() {
    this.emailloading = true
    this.userService.check_email_unique(this.model.email)
      .subscribe(
        (response) => {
          this.emailloading = false;
          if (response.exists === 'Yes') {
            this.emailError = true;
          }
          if (response.exists !== 'Yes') {
            this.emailError = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  checkuser() {
    this.Userloading = true
    this.userService.verify_username(this.model.username.toLowerCase())
      .subscribe(
        (response) => {
          this.Userloading = false;
          if (response['Res'] !== true) {
            this.UserError = false;
          }
          if (response['Res'] === true) {
            this.UserError = true;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  sub:any;
  policyChange(){
    this.model.policy = !this.model.policy
  }
  ngOnInit() {
    this.model.policy = false;
    this.sub = this.route.queryParams.subscribe(params => {
      let verification = params['verification'];
      this.userService.verifyAccountEmail(verification).subscribe(data=>{
        if(data['code']==true){
          this.router.navigate(['/login'])
        }
        else {
          swal("Something went wrong!", "", "warning");
        }
      })
    });
    // this.model.newsLetter = true
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0)
    }
  }
  check() {
    if (this.model.password == this.model.passwordRepeat) {
      this.passwrodmatch = true
    }
    else {
      this.passwrodmatch = false
    }
  }
  id: any;
  valid: any
  register() {
    this.recaptcha = this.recap.check();
    if(this.recaptcha === true){
    this.valid=true;
        if(this.model.newsLetter!=true)
        {
          this.model.newsLetter=false
        }
        this.model.username=this.model.username.toLowerCase()
        this.userService.create(this.model)
          .subscribe(
            data => {
              this.alertService.success('Registration successful', true);
              swal("Registeration Successful!", "Please check your email Inbox for Account Activation Instructions.", "success");
              // alert("Request Sucessfull")
              this.router.navigate(['/login']);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>this.GettingLoginSetting());;
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res=>this.GettingLoginSetting());;
  }
  sociallogin(user: any) {
    return this.http.post(this.url+'user/social_login/',{'user':this.user});
  }
  GettingLoginSetting(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // console.log(this.user['id'])
      this.sociallogin(this.user).subscribe(data => {
        var error=data['error']
        if(data['token']!==null && error!=true)
        {
          this.sgflag['login']=true;
          this.loggedIn = (user != null);
          // alert(data['username'])
          this.authenticationService.loginID(data['username']).subscribe(
            ID => {
              this.loginID = ID;
              if (isPlatformBrowser(this.platformId)) {
                this.router.navigate(['']);
                localStorage.setItem('currentUser', JSON.stringify(ID));
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                localStorage.setItem('userKey', JSON.stringify(ID[0].id));
                this.router.navigate(['']);
              }
              this.status=true
            }
          )
        }
        else if(error==true){
          swal("User Already exixts!", " Its seems that you have already registered with this email."+
            "please login with using credientials");
        }
      });
    });
  }
}


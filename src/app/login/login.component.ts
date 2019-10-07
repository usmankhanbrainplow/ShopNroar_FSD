import {Component, OnInit, Output, EventEmitter, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {AlertService, AuthenticationService} from '../_services';
import {DataService} from '../shareduser.service';
import {SimpleGlobal} from 'ng2-simple-global';
import swal from 'sweetalert';
import { DOCUMENT } from '@angular/platform-browser';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Headers} from "@angular/http";
import {MAT_DIALOG_DATA, MatDialog ,MatDialogRef} from "@angular/material";
import {UserService} from '../_services';
import {Md5} from "ts-md5/dist/md5";
import {HttpService} from '../services/http-service';
import {RecapchaService} from "../recapcha/recapcha.service";
import {AppServices} from '../app.services';

@Component({
  selector: 'app-login',
  styleUrls: ['login.component.css'],
  // moduleId: module.id.toString(),
  templateUrl: 'login.component.html',
  providers: [AuthenticationService, AlertService, DataService,AuthService]
})
export class LoginComponent implements OnInit {
  // @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  @Output() value= new EventEmitter<string>();
  deviceInfo = null;
  private url = environment.apiUrl;

  private user: SocialUser;
  private loggedIn: boolean;

  model: any = {};
  hide = true;
  loading = false;
  returnUrl: string;
  userFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private authService: AuthService,
              @Inject(DOCUMENT) private document: any,
              private data: DataService,
              public sgflag: SimpleGlobal,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private recap:RecapchaService) {

  }

  sub: any;
  recaptcha=true;


  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
    if (captchaResponse) {
      this.recaptcha = true;
    }
    // alert('hiii')
  }

  GoogleLogin(){


    //console.log('svahdcad  ',this.authenticationService.googlelogin())
    // this.authenticationService.googlelogin().subscribe(params => {
    //   //console.log(params);
    //
    //   //console.log('Successfull login');
    //   this.router.navigate(['']);
    //
    // }, error => {
    //   console.lologing('Error in service');
    //     this.router.navigate(['/login']);
    //
    //   })
  }
  status:any;
  ngOnInit() {
    // this.GettingLoginSetting()
    if (isPlatformBrowser(this.platformId)) {

      window.scrollTo(0, 0)
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.sub = this.route.queryParams.subscribe(params => {
      let id = params['username'];
      let token = params['token'];
      let platform = params['platform'];
      if(this.deviceInfo.device.toLowerCase( )=="iphone" ||this.deviceInfo.device.toLowerCase( )=="ipad")
      {
        // alert('shopnroar://shopnroar.com/login?name='+id+'&id='+token)
        this.document.location.href = 'shopnroar://shopnroar.com/login?name='+id+'&id='+token;

      }

      let user = {username: id, token: token};

      if(id!==null && token!=null)
      {


        if (isPlatformBrowser(this.platformId)) {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.sgflag['login']=true;


          localStorage.setItem('type', JSON.stringify('social login'));
          this.sgflag['flag']=true;
          this.authenticationService.loginID(id).subscribe(
            data => {
              this.loginID = data;
              if (isPlatformBrowser(this.platformId)) {


                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                localStorage.setItem('userKey', JSON.stringify(data[0].id));
              }

              //console.log(this.loginID)
              this.status=true
              // //console.log(this.loginID[0].id)
            }
          )
          // this.router.navigate([this.returnUrl]);
        }
      }

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/register';
  }

  loginID: any = [];

  verified:any;
  currentUser : any;

  login() {
    this.recaptcha = this.recap.check();

    this.loading = true;

    this.value.emit('logedin');

    // if(this.recaptcha==true)
    // {
      this.authenticationService.isUserAuthenticated(this.model.username).subscribe(data=>{
        if(data['code']==true)
        {
          this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
              data => {
                this.authenticationService.loginID(this.model.username).subscribe(
                  data_id => {
                    this.loginID = data_id;
                    this.sgflag['login']=true;
                    if (isPlatformBrowser(this.platformId)) {


                      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                      localStorage.setItem('userKey', JSON.stringify(data_id[0].id));

                      var title=    this.sgflag['redirectName']|| '';
                      var model=    this.sgflag['redirectModel']|| '';

                      // alert(this.sgflag['redirectName'])
                      if(title!='' && model!='' )
                      {
                        this.router.navigate(['/details'],{ queryParams: { Model: this.sgflag['redirectModel'] ,Name:this.sgflag['redirectName']} })
                      }
                      else{
                        this.router.navigate(['']);
                      }

                    }

                    //console.log(this.loginID)
                    this.status=true
                    // //console.log(this.loginID[0].id)
                  }
                )
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
                this.status=false;
              });
        }
        else {
          this.verified=false;
          swal({
            title: 'Verification Failed?',
            text: 'Your email is not verified yet!',
            icon: 'warning',
            buttons:  [ 'Not Now!','Resend Verification Mail!'],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                this.authenticationService.resendAuthentication(this.model.username).subscribe(data=>{
                  //console.log(data)
                  swal('A verification email has been sent to your account',{
                    icon: 'success',

                  })

                });
              } else {
              }
            });
        }
      })

    // }
    // else {
    //   this.recaptcha=false
    // }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>this.GettingLoginSetting());;
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res=>this.GettingLoginSetting());;
  }

  GettingLoginSetting(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
      // console.log(this.user['id'])
      this.sociallogin(this.user).subscribe(data => {
        console.log(data);
        var error=data['error']
        console.log(error)
        if(data['token']!==null && error!=true)
        {
          console.log("token return")
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
          swal("User Already exixts!", "Its seems that you have already registered with this email." +
            "please login with using credientials");
        }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  sociallogin(user: any) {

    return this.http.post(this.url+'user/social_login/',{'user':this.user});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
    });
  }
}



@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: 'reset-password-dialog.html',
  styleUrls: ['reset-password-dialog.css'],
  providers: [UserService,AlertService,HttpService]
})

export class ResetPasswordComponent {
  public model: any = {};
  public emailResponse = false;
  emailError = false;
  captcha = true;
  mailSend:any;
  myLink="http://www.shopnroar.com/reset/";
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex),
  ]);

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private alertService: AlertService,
              private httpService: AppServices) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.captcha = true;
    }
  }

  emailsubmit() {

    console.log('In EmailSubmit');

    console.log(this.model.email)
    if ( this.captcha === true )
    {
      this.userService.check_email_unique(this.model.email)
        .subscribe(
          (response) => {
            // alert(this.model.email)
            console.log(response)
            if (response.exists === 'Yes') {
              this.emailError = true;
              let hass =  new Date();

              let hash = Md5.hashStr(this.model.email+""+hass);
              this.myLink=this.myLink+""+hash;
              this.httpService.Add_link(this.model.email,this.myLink).subscribe(
                (response) => {
                  console.log(response)
                  ResetPasswordComponent.resetSuccess();
                  this.mailSend=true;
                  // alert("111")

                },
                error => {
                  this.mailSend=false
                })

            }
            if (response.exists !== 'Yes') {
              ResetPasswordComponent.emailError();
            }

          },
          error => {
            this.alertService.error(error);
          });

    }
    else
    {
      this.captcha = false;
    }
  }
  static resetSuccess(){
    swal('Password reset Email has been sent to your email.')
  }
  static emailError() {
    swal('Something went wrong.')
  }
}

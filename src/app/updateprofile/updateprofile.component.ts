import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {AlertService, UserService,AuthenticationService} from '../_services/index';
import {Router} from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import swal from 'sweetalert';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss'],
  providers: [UserService, AlertService,AuthenticationService]

})
export class UpdateprofileComponent implements OnInit {
  emailError: any;
  UserError: any;
  flag:any;
  model: any = {};


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userService: UserService,
              private alertService: AlertService,               public sgflag: SimpleGlobal,
              private router: Router, private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let user= JSON.parse(localStorage.getItem('currentUser')) || 0;
      if(user)
      {
        this.authenticationService.userProfile(user.username).subscribe(
          data => {
            this.model = data;
            console.log(this.model)
            console.log(this.model.first_name)
          })
      }
    }

  }
  update(){
    if (this.emailError !== true) {
      this.authenticationService.UpdateProfile(this.model).subscribe(data => {
        console.log(data)
        console.log(data.status)
        if(data.status==200)
        {
          this.flag=true

        }



      })

    }
    else
    {
      alert('Please review errors')
    }
  }
  logout() {
    if (isPlatformBrowser(this.platformId)) {

      // remove user from local storage to log user out
      var currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;
      var localtoken = currentUser.token; // your token
      // window.open("http://ns519750.ip-158-69-23.net:8005/settings/logout");

      // remove user from local storage to log user out
      this.sgflag['login']=false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('type');
      localStorage.removeItem('userKey');
      localStorage.removeItem('loginUser');
      localStorage.removeItem('logintoken');
      this.router.navigate(['']);
      swal('Successfully Logout from SHOPnROAR','', 'success')


    }
  }

  checkmail() {
    this.userService.check_email_unique(this.model.email)
      .subscribe(
        (response) => {
          // alert(this.model.email)

          console.log(response)
          if (response.exists === 'Yes') {
            this.emailError = true;
          }
          if (response.exists !== 'Yes') {
            this.emailError = false;
          }

        },
        error => {
          this.alertService.error(error);
        });

  }

  checkuser() {
    this.userService.verify_username(this.model.username.toLowerCase())
      .subscribe(
        (response) => {
          console.log(response['Res'])
          if (response['Res'] !== true) {
            this.UserError = false;
          }
          if (response['Res'] === true) {
            this.UserError = true;
          }

        },
        error => {
          this.alertService.error(error);
        });
  }


}

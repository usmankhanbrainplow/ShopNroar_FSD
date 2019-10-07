import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
// import {HttpService} from '../http.service';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import { SimpleGlobal } from 'ng2-simple-global';
import swal from 'sweetalert';
import {AppServices} from '../app.services';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss'],

})
export class UpdatepasswordComponent implements OnInit {

  model: any = {}
  currentUser: any;
  match: any;
  update:any;
  currentpasswrong:any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              public sgflag: SimpleGlobal,
              private httpService: AppServices,private router: Router) {
  }


  check() {

    if (this.model.password == this.model.repeatpassword) {
      this.match = true
    }
    else {
      this.match = false
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

  updatePass() {
    if (this.model.password == this.model.repeatpassword) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || 0;

      this.httpService.checkpasswordExistence(this.currentUser.username, this.model.currentpassword).subscribe(
        (data) => {
          console.log(data)
          if (data['exists'] === 'Yes') {
            if (this.model.password === this.model.repeatpassword) {
              this.httpService.UpdatePasswordmanually(this.currentUser.username, this.model.password).subscribe((res) => {
                this.update = true
                console.log('-----------')
                console.log(this.update)
                this.router.navigate(['']);
              })
            }
            else {
              this.update = false;
              console.log('-----not updated------')

              console.log(this.update)
            }


          }
          else {
            this.currentpasswrong = false;
            console.log('-----wrong current password------')

            console.log(this.currentpasswrong)


          }

        }
      )

    }
    else{

    }
  }

  ngOnInit() {
  }

}

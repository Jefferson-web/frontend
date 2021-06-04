import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { UserService } from '../services/usuario/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  remember: boolean = false;
  email: string;
  auth2: any;

  constructor(
    private _userService: UserService,
    private router: Router,
    private _alertService: AlertService,
    private zone:NgZone
  ) {}

  ngOnInit(): void {
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.remember = true;
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      this._userService.login({ email, password }, this.remember).subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this._alertService.alert(error.message, 'danger', 3000);
        }
      );
    } else {
      this._alertService.alert('Please, enter your email and password ','warning',3000);
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1041008734498-njc8p90j3qmdon6g3h0jvbp3qvcbr6q0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('google-sign-in'));
    });
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(id_token).subscribe((response) => {
        this.zone.run(()=> {
          this.router.navigate(['/dashboard']);
        })
      });
    });
  }

  ngOnDestroy(){
    this.auth2 = null;
  }

}

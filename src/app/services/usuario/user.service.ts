import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user.model';
import { baseUrl } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ILogin } from '../../interfaces/login.interface';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user:any;
  public access_token: string;

  constructor(private http: HttpClient,
              private router: Router) {}

  register(user: User) {
    let url = baseUrl + '/users';
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Creado',
          text: 'Ahora puedes entrar a la aplicación',
        });
        return resp.usuario;
      })
    );
  }

  login(payload: ILogin, remember: boolean = false) {
    let url = baseUrl + '/auth/login';
    if(remember){
      localStorage.setItem('email', payload.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, payload)
    .pipe(
      map((resp: any) => {
        this.saveInLocalStorage(resp.user._id, resp.access_token, resp.user);
        return resp;
      }),
      catchError(err => {
        return throwError(err.error.errors)
      })
    )
  }

  loginGoogle(id_token: string){
    let url = baseUrl + '/auth/google';
    return this.http.post(url, {id_token}).pipe(
      map((resp: any) => {
        this.saveInLocalStorage(resp.user._id, resp.access_token, resp.user);
        return resp;
      })
    )
  }

  logout(){
    this.user = null;
    this.access_token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
  get isLogged(){
    return !!localStorage.getItem('access_token');
  }

  getUser(){
    return this.user;
  }

  saveInLocalStorage(id: string, access_token: string, user: any){
    localStorage.setItem('id', id);
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('ENTRO AL LOCAL STORAGE');
    this.user = Object.assign({}, user);
    this.access_token = access_token;
  }

}

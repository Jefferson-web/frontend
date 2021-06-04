import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from '../usuario/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private _userService: UserService,
              private router: Router){}

  canActivate(): boolean {
    if(this._userService.isLogged){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

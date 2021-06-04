import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user:any;
  constructor(private _userService: UserService) { 
  }

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  logout(){
    this._userService.logout();
  }

}

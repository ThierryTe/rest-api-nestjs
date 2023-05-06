import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.authenticationService.logout();
  }
}

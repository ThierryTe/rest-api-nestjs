import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { UsersService } from 'src/app/services/users.service';
import { UserElement } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
    public users: UserElement[] = [];
    public searchText: string = '';
    public page:any;
    public settings: Settings;
    public maxSize:number = 5;
    
    public autoHide:boolean = true;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public usersService:UsersService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getUsers();         
    }

    public getUsers(): void {
        this.users = []; //for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);    
    }
    public addUser(user:UserElement){
        this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user:UserElement){
        this.usersService.updateUser(user).subscribe(user => this.getUsers());
    }

    public onPageChanged(event:any){
        this.page = event;
        this.getUsers();
        window.scrollTo(0,0);
        // if(this.settings.fixedHeader){      
        //     document.getElementById('main-content').scrollTop = 0;
        // }
        // else{
        //     document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        // }
    }

}
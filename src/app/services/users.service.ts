import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserElement } from '../models/user.model';

@Injectable()
export class UsersService {
    constructor(public http:HttpClient) { }
    url =environment.auth.USERS_API;
    
    getUsers(): Observable<UserElement[]> {
        return this.http.get<UserElement[]>(this.url);
    }

    addUser(user:UserElement){	    
        return this.http.post(`${environment.auth.USERS_API}`, user);
    }

    updateUser(user:UserElement){
        return this.http.put(`${environment.auth.USERS_API}`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.auth.USERS_API}` + "/" + id);
    } 
} 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserElement } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(public http:HttpClient) { }

  getUsers(): Observable<UserElement[]> {
    return this.http.get<UserElement[]>(environment.auth.USERS_API);
}

updateUser(user:UserElement){
    return this.http.put(`${environment.auth.USERS_API}`, user);
}

deleteUser(id: number) {
    return this.http.delete(`${environment.auth.USERS_API}` + "/" + id);
}

getId(id:number){
  return this.http.get<UserElement>(`${environment.auth.USERS_API}` + "/" + id)
}

}

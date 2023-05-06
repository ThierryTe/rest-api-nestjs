import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserElement } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  constructor(private http: HttpClient,public router:Router) { }

  login(user:any):Observable<any> {
    return this.http.post<{token: string}>(`${environment.auth.LOGIN_API}`, 
    { username:user.username, 
      password:user.password},
    httpOptions).pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
}
logout(){
  localStorage.removeItem('access_token');
  this.router.navigateByUrl('login');
}

 register(user:any): Observable<any> {
  return this.http.post(environment.auth.INSCRIPTION_API, {
    nom: user.nom,
    prenom:user.prenom ,
    username:user.username,
    password:user.password
  }, httpOptions);
} 
  
  refreshtoken(token: string){
    return this.http.post(`${environment.auth.REFRESH_TOKEN_API}`,{
      refreshToken: token
    },
    httpOptions
    );

  }
  public checkIfAmLogin(): Observable<boolean> {

    return this.http.head(environment.auth.CHECK_IF_AM_LOGIN, { observe: "response" }).pipe(
      map((res) => {
        if(res.status===200){
          return  true;
         }else {
           return false;
         }
      }),
      catchError((err) => {
        return of(false)
      }),);
  }
  
}

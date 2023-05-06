import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';




@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private token: TokenStorageService, private router: Router
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('access_token')) {
            return true;
          }
      
          this.router.navigate(['login']);
          return false;
        }




       /*  if ( this.token.getUser() && this.authenticationService.checkIfAmLogin().subscribe()) {
            this.authenticationService.checkIfAmLogin();
            console.log(this.token.getUser())
        return true;
        }
        else {
        this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url } });
        return false
        } */
    }
    
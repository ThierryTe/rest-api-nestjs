import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UtilisateurService } from "src/app/services/utilisateur.service";
import { environment } from "src/environments/environment";

@Injectable()
export class CompteResolver implements Resolve<any>{
    constructor(private service:UtilisateurService){}
    resolve(route: ActivatedRouteSnapshot) {
        const id:any = route.paramMap.get("id");
        return this.service.getId(id).pipe(
          map((res):any => {
              if(res && res.id) {
                return res;
              }
              location.href =environment.FRONTEND_ROUTES.INSCRIPTION;
          }),
          catchError(error => {
            location.href =environment.FRONTEND_ROUTES.INSCRIPTION;
            return of(null)
          })
        );
    }

}
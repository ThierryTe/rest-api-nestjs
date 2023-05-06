import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve} from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProduitService } from "src/app/services/produit.service";
import { environment } from "src/environments/environment";

@Injectable()
export class ProduitResolver implements Resolve<any>{
    constructor(private service: ProduitService){}
    
    resolve(route: ActivatedRouteSnapshot) {
        const id:any = route.paramMap.get("id");
    return this.service.get(id).pipe(
      map((res):any => {
        if (res && res.id) {
          return res;
        }
        location.href = environment.FRONTEND_ROUTES.PRODUIT;
      }),
      catchError(error => {
        location.href = environment.FRONTEND_ROUTES.PRODUIT;
        return of(null)
      })
    );

    }
}
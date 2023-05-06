import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Categorie } from "../models/categorie.model";
import { GeneralService } from "./general.service";

@Injectable()
export class CategorieService extends GeneralService<Categorie>{
    constructor(public http:HttpClient){
        super(http);
    }
  
    public getUrl(): string {
        return environment.APP.CATEGORIE_API;
    }

}
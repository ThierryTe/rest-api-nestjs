import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Produit } from "../models/produit.model";
import { GeneralService } from "./general.service";

@Injectable()
export class ProduitService extends GeneralService<Produit>{
    
    constructor(public http:HttpClient){super(http)}

    public getUrl(): string {
        return environment.APP.PRODUIT_API;
    }
}
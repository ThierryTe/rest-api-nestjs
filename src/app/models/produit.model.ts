import { Categorie } from "./categorie.model";

export class Produit{
    id?:number;
    nom?:string;
    description?:string;
    nouveauPrix?:number;
    ancienPrix?:number;
    images?: string[];
    taille?: string;
    categorie!: Categorie;
}
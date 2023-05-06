import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { Produit } from 'src/app/models/produit.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';
import { LocationUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent implements OnInit {
  public formulaire!: FormGroup;
  public isLoadingResults:boolean = false;
  public produit: Produit;
  public categories!:Categorie[];

  get categorie(){return this.formulaire.get('categorie');}
  get nom(){return this.formulaire.get('nom');}
  get nouveauPrix(){return this.formulaire.get('nouveauPrix');}
  get ancienPrix(){return this.formulaire.get('ancienPrix');}
  get taille(){return this.formulaire.get('taille');}
  get description(){return this.formulaire.get('description');}
 get images(){return this.formulaire.get('images');}

  constructor(private produitService:ProduitService,
    private _snackBar: MatSnackBar,
   public fb: FormBuilder,
   private route: ActivatedRoute,private router: Router, public categorieService:CategorieService) {
    this.produit = this.route.snapshot.data["produit"];
    this.formulaire = this.fb.group({
      id:[null],
      categorie:[null, Validators.required],
      nom:[null,Validators.required],
      nouveauPrix:[null],
      ancienPrix:[null,Validators.required],
      taille:[null],
      description:[null, Validators.required],
      images:[null]
    })
    }

  ngOnInit(): void {
    this.getCategories();
    if(this.produit){
      this.formulaire.patchValue({
        id:this.produit.id,
        categorie:this.produit.categorie,
        nom: this.produit.nom,
        nouveauPrix:this.produit.nouveauPrix,
        ancienPrix:this.produit.ancienPrix,
        taille:this.produit.taille,
        description:this.produit.description,
        images:this.produit.images
      })
    }else{
      this.produit = new Produit();
    }
  }

  public getCategories(){   
    this.categorieService.getAll().subscribe(data => {
      this.categories = data; 
    }); 
  }

  public fileChange(images: any[] = []){ 
      images.forEach(item=>{
        let image = {
          link: item.medium,
          preview: item.medium
        }
        images.push(image);
      })
      this.formulaire.controls.images.setValue(images);
  } 
  resetForm(){
    this.router.navigate([`${environment.FRONTEND_ROUTES.PRODUIT}`]);
}

onSubmit() {
  if (this.formulaire.value) {
    this.isLoadingResults=true;
    if (this.formulaire.value.id) {
      this.produitService.update(this.produit.id,this.formulaire.value).subscribe(
        (data) => {
        this.isLoadingResults=false;
        this.openSnackBar("Location modifiée  avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.PRODUIT]);
        },
        errorResponse => {
          this.isLoadingResults=false;
          LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );

    } else {
      this.produitService.add(this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Location ajoutée avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.PRODUIT]);
        },
        errorResponse => {
          this.isLoadingResults=false;
         LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );
    }
  }



}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition: "top",
  });
}
}

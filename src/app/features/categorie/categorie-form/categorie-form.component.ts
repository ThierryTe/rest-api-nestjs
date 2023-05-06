import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs/internal/Subject';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { LocationUtils } from 'src/app/shared/utils.functions';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.scss']
})
export class CategorieFormComponent implements OnInit {
  public formulaire!: FormGroup;
  private _onDestroy = new Subject<void>();
  public isLoadingResults:boolean = false;
  listCategorie:any = []

  constructor(public dialogRef: MatDialogRef<CategorieFormComponent>,
    @Inject(MAT_DIALOG_DATA) public categorie: Categorie, private _snackBar: MatSnackBar,
    public fb: FormBuilder, public categorieService: CategorieService) { 
      this.formulaire=this.fb.group({
        id:[null],
        nom:[null, Validators.compose([Validators.required])]
      });
    }

  ngOnInit(): void {
    if(this.categorie){
      this.formulaire.setValue({
        id:this.categorie.id,
        nom:this.categorie.nom
      })
    }else{
      this.categorie = new Categorie();
    }
  }

  onSubmit() {
    if (this.formulaire.value) {
      this.isLoadingResults = true;
      if (this.formulaire.value.id) {
        this.categorieService.update(this.categorie.id,this.formulaire.value).subscribe(
          data => {
            this.isLoadingResults = false;
            this.dialogRef.close(data);
          },
          errorResponse => {
            this.isLoadingResults = false;
            LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
            }
        );
      } else {
        this.categorieService.add(this.formulaire.value).subscribe(
          data => {
            this.isLoadingResults = false;
            this.dialogRef.close(this.formulaire.value);
          },
          errorResponse => {
            this.isLoadingResults = false;
            LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
            }
        );
      }
    }

} 
closeFormModal(): void {
  this.dialogRef.close();
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition: "top",
  });
}

ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}

public getCategories(){
  return this.categorieService.getAll().subscribe(data =>{
    this.listCategorie = data;
  })
}



}

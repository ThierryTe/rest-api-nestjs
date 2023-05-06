import { Compiler, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { AppConfirmService } from 'src/app/shared/utils/app-confirm/app-confirm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  displayedColumns: string[] = ['categorie','nom', 'nouveauPrix', 'ancienPrix', 'taille','description','actions'];
  dataSource!: any;
  loading=false;
  produit: Produit[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  isLoadingResults = false;
  constructor( public produitService:ProduitService, private _snackBar: MatSnackBar,
    public dialog: MatDialog,private compiler: Compiler,  public appConfirme: AppConfirmService,private router: Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.getProduit();
  }
  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }  

  public ajout() {
    this.router.navigate([`${environment.FRONTEND_ROUTES.PRODUIT}/edition`]);
  }

  public modifier(produit: Produit) {
    this.router.navigate([`${environment.FRONTEND_ROUTES.PRODUIT}/edition`,produit.id]);
   }

  public supprimer(data:any) {
    this.appConfirme.confirm().subscribe((choix)=>{
      if(choix==true){

   this.produitService.delete(data._id).subscribe(
     data => {
       this.openSnackBar("Le produit a été supprimé avec succès","OK");
       this.getProduit();
       this.loading=false;
     },
     errorResponse => {
       let errorData = errorResponse.error;
  
       this.openSnackBar("Impossible de supprimer le produit","OK");
     }
   );
    }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 25000,
      verticalPosition:'top'
   
    });
   }

   public getProduit(){
     this.produitService.getAll().subscribe(data =>{
       this.produit=data;
       this.dataSource = new MatTableDataSource(this.produit);
       this.initDataSource(data);
       this.loading=false
     });
   }






}

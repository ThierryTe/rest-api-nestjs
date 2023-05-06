import { Compiler, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { AppConfirmService } from 'src/app/shared/utils/app-confirm/app-confirm.service';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  displayedColumns: string[] = ['nom','actions'];
  dataSource!: any;
  loading=false;
  categorie: Categorie[]=[];
  public refeshDataSubject: Subject<string> = new Subject<string>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  isLoadingResults = false;
  constructor(public categorieService:CategorieService, private _snackBar: MatSnackBar,
    public dialog: MatDialog,private compiler: Compiler,  public appConfirme: AppConfirmService,) { }

  ngOnInit(): void {
    this.loading=true;
    this.getCategories();
  }


  public openFormModal(categorie: Categorie | null){
    this.dialogRef = this.dialog.open(CategorieFormComponent, {
      data: categorie,
      width: '40vw',
      height:'40vh',
      disableClose:true
    });

    this.dialogRef.afterClosed().subscribe(categorie => {
      if(categorie){
        if(categorie.id) {
          this.openSnackBar("La catégorie a été modifiée avec succès","OK");   
        }else {
         this.openSnackBar("La catégorie a été ajoutée avec succès","OK");
        }
       }
       this.getCategories();
       this.loading=false;
       this.refeshDataSubject.next("");
  });

  }
  public dialogRef?: MatDialogRef<CategorieFormComponent, any>;


  public ajout(){
    this.openFormModal(null);
    }
  
    public modifier(categorie:any) {
      this.openFormModal(categorie);
     }


     public delete(categorie:Categorie | any){
      this.appConfirme.confirm().subscribe((choix)=>{
        if(choix==true){
          this.categorieService.delete(categorie.id).subscribe((data)=>{
            this.openSnackBar("Catégorie supprimée avec success !","OK");
           this.getCategories();
           this.loading=false;
          })
      }
    });
    
      
   }
   public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 25000,
      verticalPosition:'top'
   
    });
   }

   public getCategories(){
    this.categorieService.getAll().subscribe(data =>{
      this.categorie=data;
      this.dataSource = new MatTableDataSource(this.categorie);
      this.initDataSource(data); 
      this.loading=false
    });
  }

}

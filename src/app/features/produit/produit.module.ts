import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { ProduitService } from 'src/app/services/produit.service';
import { ProduitResolver } from './produit-resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorieService } from 'src/app/services/categorie.service';


@NgModule({
  declarations: [
    ProduitComponent,
    ProduitFormComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule, 
    MatListModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
   
  ],
  providers:[ProduitService,ProduitResolver,CategorieService]
})
export class ProduitModule { }

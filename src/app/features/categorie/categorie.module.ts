import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { CategorieService } from 'src/app/services/categorie.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CategorieComponent,
    CategorieFormComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule, 
    MatListModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers:[CategorieService]
})
export class CategorieModule { }

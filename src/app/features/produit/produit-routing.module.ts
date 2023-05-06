import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { ProduitResolver } from './produit-resolver';
import { ProduitComponent } from './produit.component';

const routes: Routes = [{ path: '', component: ProduitComponent },
{path:'edition',component:ProduitFormComponent, data:{breadcrumb:"Création d'un produit"}},
{path:'edition/:id', component:ProduitFormComponent, resolve:{produit:ProduitResolver}, data:{breadcrumb:'Modification'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteRoutingModule } from './compte-routing.module';
import { CompteComponent } from './compte.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CompteComponent
  ],
  imports: [
    CommonModule,
    CompteRoutingModule,
    SharedModule

  ]
})
export class CompteModule { }

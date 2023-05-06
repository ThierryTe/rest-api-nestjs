import { AppConfirmService } from './app-confirm/app-confirm.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppComfirmComponent } from './app-confirm/app-confirm.component';


@NgModule({
  declarations: [AppComfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UtilsModule { }

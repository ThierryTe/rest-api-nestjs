import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent}
  
];
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatSidenavModule, 
    MatListModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class LoginModule { }

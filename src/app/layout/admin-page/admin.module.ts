import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FullScreenComponent } from '../fullscreen/fullscreen.component';
import { MenuComponent } from '../menu/menu.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RemoteErrorMessageSnackbarComponent } from 'src/app/shared/app-toast/snackbar.component';



@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    BreadcrumbComponent,
    RemoteErrorMessageSnackbarComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    BreadcrumbComponent 
  ],
  
})
export class AdminModule { }

import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';

interface confirmData {
  title?: string;
  message?: string;
  buttun1?: string;
  buttun2?: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfirmService {
  constructor(private dialog: MatDialog) {}

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirmation';
    data.message = data.message || `Voulez vous confirmer l'action suivante ?`;
    data.buttun1 = data.buttun1 || `Non Merci`;
    data.buttun2 = data.buttun2 || `Oui`;
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      maxWidth: '100vw',
      position: {
        top:"7vw"
      },
      disableClose: true,
      data: { title: data.title, message: data.message, button1: data.buttun1,  button2: data.buttun2}
    });
    return dialogRef.afterClosed();
  }
}

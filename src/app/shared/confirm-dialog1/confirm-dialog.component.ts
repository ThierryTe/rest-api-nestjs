import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent1 implements OnInit {
  public title: string;
  public message: string;
  public refuseIsActive: boolean=true;
  public buttonDroit:string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent1>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) { 
    this.title = data.title;
    this.message = data.message;
    this.buttonDroit = data.buttonDroit;
    this.refuseIsActive = data.refuseIsActive;

  }

  ngOnInit(): void {
  }

  onConfirm(): void { 
    this.dialogRef.close(true);
  }

  onDismiss(): void { 
    this.dialogRef.close(false);
  }

}

export class ConfirmDialogModel { 
  constructor(public title: string, public message: string,public refuseIsActive:boolean,public buttonDroit: string) { }
}

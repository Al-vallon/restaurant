import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  constructor(
    private dialog : MatDialog,
    private dialogRef: MatDialogRef<ConfirmModalComponent>
  ) {}

  public cancel(): void {
    this.dialogRef.close();
  };

  public cancelAll(): void { 
    this.dialog.closeAll();
  }
}

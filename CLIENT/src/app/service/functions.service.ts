import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmModalComponent } from '../component/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    public dialog: MatDialog
  ) { }

  /* open confirm modal */
  public openDialog() {
    this.dialog.open(ConfirmModalComponent);
  }
}

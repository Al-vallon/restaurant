import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition:MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string) {
    this.snackBar.open(message, ' X ', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

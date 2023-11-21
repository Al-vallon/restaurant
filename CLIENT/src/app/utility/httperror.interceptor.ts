import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../service/error.service';
import { SnackbarService } from '../service/snackbar.service';



@Injectable()
export class httperrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService, private snackbar: SnackbarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403 ) {
          const errorMessage = error.error.message || 'Erreur d\'authentification';
          this.snackbar.showSnackBar(errorMessage); /* call service snack bar to display error*/
        }
        return throwError(() => error.message )
      })
    );
  };
}

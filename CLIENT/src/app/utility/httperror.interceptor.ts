import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../service/error.service';
import { SnackbarService } from '../service/snackbar.service';



@Injectable()
export class httperrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService, private snackbar: SnackbarService) {}

/**********************************************************************************************************************************************************************
 * THIS CODE REPRESENTS AN INTERCEPTOR IN ANGULAR FOR HTTP REQUESTS. WHEN A REQUEST IS MADE, THE INTERCEPTOR CAPTURES THE RESPONSE.                                   *
 * IF IT DETECTS AN ERROR RELATED TO AUTHENTICATION (STATUS 401) OR INSUFFICIENT AUTHORIZATION (STATUS 403), IT EXTRACTS THE ERROR MESSAGE FROM THE HTTP RESPONSE.    *
 * IT THEN USES A NOTIFICATION BAR SERVICE (THIS.SNACKBAR.SHOWSNACKBAR()) TO DISPLAY THIS ERROR MESSAGE. FINALLY,                                                     *  
 * THE INTERCEPTOR RETURNS A MODIFIED VERSION OF THE ERROR ALONG WITH THE ORIGINAL ERROR MESSAGE.                                                                     *
 * THIS APPROACH ENABLES AUTHENTICATION OR AUTHORIZATION ERRORS TO BE HANDLED CENTRALLY THROUGHOUT THE ANGULAR APPLICATION.                                           *
 **********************************************************************************************************************************************************************/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403 || error.status === 400) {
          const errorMessage = error.error.message || 'Erreur d\'authentification';
          console.log('error mesage: ' + error.error.message);
          this.snackbar.showSnackBar(errorMessage); /* call service snack bar to display error*/
        }
        return throwError(() => error.message )
      })
    );
  };
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { HttpService, Users } from '../../service/http.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ErrorInterceptor } from '../../service/errorInterceptor/error-interceptor.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../service/error.service';
import { FunctionsService } from '../../service/functions.service';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  /* VARIABLES */

  /* unsubscribe oberservable */
  private unsubscribe = new Subject<void>();
  /* save user after get post */
  public User: any;

  /* hide password */
  public hide: boolean = true;

  public userResultObservable: any;

  /* display error msg from server */
  public errorMessage$ = this.errorService.errorMessage$;

  /* save token */
  public token!: string;

  public rememberMe: boolean = false;

  /* get all datas of UserForm  */
  // public userForm =  FormGroup

  public userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    mail:['', [Validators.required,Validators.email]]
  });

  constructor( 
    public router: Router,
    private http: HttpClient,
    private HttpService: HttpService,
    public fb: FormBuilder,
    private errorService: ErrorService,
    public fn: FunctionsService,
    public userService: UserDataService,
    public localStorage: LocalStorageService) 
    { }

    ngOnInit(){
      const remembreState = this.localStorage.getItem('rememberMe');
      if (remembreState!== null){
        this.rememberMe = remembreState;
      }
    }

    saveSession() {
      this.localStorage.setItem('rememberMe', this.rememberMe);
    }

/*******************************************************************************************************
 *         THIS METHOD MANAGES THE SENDING OF CONNECTION INFORMATION THROUGH THE HTTP SERVICE.         *
 *      IT SUBSCRIBES TO THE OBSERVABLE RESULTING FROM THE REQUEST, AND STORES THE DATA RECEIVED,      *
 * CHECKS WHETHER THE CONNECTION WAS SUCCESSFUL, AND REDIRECTS THE USER TO THE MAIN PAGE IF NECESSARY. *
 *******************************************************************************************************/

  public sendLogin():void {
    this.HttpService.logUser(this.userForm.value as Users)
    .pipe(take(1))
    .subscribe((data: any) => {
      this.userResultObservable = data
      console.log('this.userResultObservable', this.userResultObservable, 'ok', data);
      if(this.userResultObservable.message === "Successful connection")  {
        sessionStorage.setItem('Token', this.userResultObservable.token);
        console.log('token', sessionStorage.getItem('Token'));
        const username = this.userForm.value.name;
        if (typeof username === 'string' && username.trim() !== '') {
          this.userService.setUsername(username);
          console.log(username);
        }
        this.router.navigate(['/']);
      }
    });
  }




  /* FUNCTION */

/************************************************************************************************
 * This method retrieves the error message associated with the user form's email field.         *
 * If the field is required and has no value, returns an appropriate message.                   *
 * Otherwise, checks if the email format is invalid and returns a message accordingly.          *
 ************************************************************************************************/

  public getErrorMessage(){
    const mailControl = this.userForm.get('mail')
    if(mailControl && mailControl.hasError('required')){
      return 'You must enter a value'
    }
    return (mailControl && mailControl.hasError('email')) ? 'Please enter a valid email' : '';
  };

  /* redirection for new user */
  public redirection(){
    this.router.navigate(['/register']);
  }

  public openDialog(){
    this.fn.openDialog();
  };


  





  
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
  

}

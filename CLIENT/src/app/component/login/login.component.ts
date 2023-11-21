import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { HttpService, Users } from '../../service/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { ErrorInterceptor } from '../../service/errorInterceptor/error-interceptor.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../service/error.service';

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
    public dialog: MatDialog) 
    {}


    public sendLogin():void {
      this.HttpService.logUser(this.userForm.value as Users)
      .pipe(take(1))
      .subscribe((data: any) => {
        console.log('data', data);
        this.userResultObservable = data
        console.log('this.userResultObservable', this.userResultObservable);
        if(this.userResultObservable.message === "Successful connection")  {
          sessionStorage.setItem('Token', this.userResultObservable.token);
          console.log('token', sessionStorage.getItem('Token'));
          this.router.navigate(['/']);
        }
      });
    }




  /* FUNCTION */

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

  


  





  
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
  

}

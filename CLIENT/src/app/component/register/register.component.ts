import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { HttpService, Users } from '../../service/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { ErrorInterceptor } from '../../utility/httperror.interceptor';
import { Router } from '@angular/router';


import { ErrorService } from '../../service/error.service';
import { FunctionsService } from '../../service/functions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  /* VARIABLES */

  /* unsubscribe oberservable */
  private unsubscribe = new Subject<void>();
  
   /* hide password */
  public hide: boolean = true;

  /* save data from post */
  public saveRegisterUserData: any;

  public registerUserForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    password2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    mail:['', [Validators.required,Validators.email]]
  });

  constructor( 
    public router: Router,
    private http: HttpClient,
    private HttpService: HttpService,
    public fb: FormBuilder,
    private errorService: ErrorService,
    public fn: FunctionsService) 
  {}

/**************************************************************
 * THIS METHOD SENDS NEW USER INFORMATION TO THE HTTP SERVICE *
 *    TO REGISTER A NEW USER. IT FIRST CHECKS THE VALIDITY    *
 *        OF THE USER CREATION FORM BEFORE PROCEEDING         *
 **************************************************************/

  public sendNewUser() {
    if (this.registerUserForm && this.registerUserForm.valid) {
      this.HttpService.registerUser(this.registerUserForm.value as Users)
      .pipe(take(1))
      .subscribe((registerData: any) => {
        this.saveRegisterUserData = registerData;
        console.log('register', this.saveRegisterUserData);
      })
    }
  }

  /* open confirm modal */
  public openDialog() {
    this.fn.openDialog();
  }

}

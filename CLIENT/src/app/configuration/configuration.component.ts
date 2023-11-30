import { Component } from '@angular/core';
import { HttpService, Users } from '../service/http.service';
import { FormBuilder, Validators } from '@angular/forms';

import { FunctionsService } from '../service/functions.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  public hide: boolean = false;

  public changeUserForm = this.fb.group({
    name: ['', [ Validators.minLength(3), Validators.maxLength(20)]],
    password: [''],
    password2: [''],
    mail:['', [Validators.email]]
  });

  // [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
constructor(
  private httpService: HttpService, 
  private fb: FormBuilder,
  public fn:FunctionsService
  ) {}


  public sendNewUserConfig() {
      console.log('hello');
    
  }

/*******************************************************************************************************
 *           THIS METHOD MANAGES THE SENDING OF CONNECTION INFORMATION VIA THE HTTP SERVICE.           *
 *        IT SUBSCRIBES TO THE OBSERVABLE RESULTING FROM THE REQUEST, STORES THE DATA RECEIVED,        *
 * CHECKS WHETHER THE CONNECTION WAS SUCCESSFUL, AND REDIRECTS THE USER TO THE MAIN PAGE IF NECESSARY. *
 *                                           @RETURNS {VOID}                                           *
 *******************************************************************************************************/
  
  public canSubmit() {
    const nameControl = this.changeUserForm.get('name');
    const nameChanged = nameControl?.dirty && nameControl?.value && nameControl?.value.length >= 3
    const passwordsEqual = this.arePasswordsEqual()
    const mailControl = this.changeUserForm.get('mail');
    const mailChanged = mailControl?.dirty && mailControl?.value && mailControl?.valid
    return nameChanged || passwordsEqual || mailChanged
  }

/****************************************************************************************************
 *           THIS METHOD CHECKS WHETHER THE PASSWORDS ENTERED IN THE FORM ARE IDENTICAL.            *
 * @RETURNS {BOOLEAN} RETURNS TRUE IF THE PASSWORDS ARE IDENTICAL AND NOT EMPTY, OTHERWISE FALSE.   *
 ****************************************************************************************************/

  public arePasswordsEqual() {
    const pass1 = this.changeUserForm.get('password')?.value
    const pass2 = this.changeUserForm.get('password2')?.value
    return pass1 === pass2 && pass1 !== '' && pass2 !== ''
  }



  /* open confirm modal */
  public openDialog() {
    this.fn.openDialog()
  }
}


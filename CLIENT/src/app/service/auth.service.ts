import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated = false;

  public login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  public isAuthenticate(): boolean {
    const token = sessionStorage.getItem('Token');
    console.log('token from auth service', token);
    return !!token;
  }
}

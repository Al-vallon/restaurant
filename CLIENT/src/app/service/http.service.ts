import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface Users {
  name: string;
  password: string;
  password2: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiURL = 'https://localhost:5000';

  constructor(private http: HttpClient) { }
  
  public logUserURL: string = `${this.apiURL}/login`;
  public registerUserURL: string = `${this.apiURL}/register`;

  /* Register user */
  public registerUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.registerUserURL, user, { withCredentials: true })
    .pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        throw error; // Rethrow the error for the subscriber to handle
      })
    );
  }

  /* Login user */
  public logUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.logUserURL, user, { withCredentials: true })
    .pipe(
      catchError((error) => {
        console.error('Error logging user:', error);
        throw error; // Rethrow the error for the subscriber to handle
      })
    );;
  }
}

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public username$: Observable<string> = this.usernameSubject.asObservable();

  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  constructor() { }
}

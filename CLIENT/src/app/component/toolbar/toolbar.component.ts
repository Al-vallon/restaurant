import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { UserDataService } from '../../service/user-data.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent  {
  @Input() sidenav!: MatSidenav;
  public isCollapsed: boolean = true;
  public username$: Observable<string> = new Observable<string>();

  constructor(public router: Router,
    public userService: UserDataService,
    public localStorage: LocalStorageService) {
      
    }

    ngOnInit(): void {
      this.username$ = this.userService.username$;
    }

  public toggleMenu() {
    console.log('eed', this.sidenav)
    if (this.sidenav) {
      console.log('here is collapsed');
      this.sidenav.toggle();
      this.isCollapsed = !this.isCollapsed;
      console.log('colapsed is', this.isCollapsed);
    } else {
      console.error('MatSidenav is not defined.');
    }
  }

  public login() {
    const rememberMe = this.localStorage.getItem('rememberMe');
    if (rememberMe === true) { 
      this.router.navigate(['/admin']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }

  public configuration() {
    this.router.navigate(['/configuration']);
  }
}

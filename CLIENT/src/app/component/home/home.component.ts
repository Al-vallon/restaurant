import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../service/localStorage.service';

import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // @ViewChild('sideNav') SideNav!: MatSidenav;

  constructor(
    public localStorage: LocalStorageService,
    public router: Router )
    { }

  ngAfterViewInit() {
    const rememberMe = this.localStorage.getItem('rememberMe');
    if (rememberMe === true) { 
      this.router.navigate(['/admin']); 
    }
  }

}

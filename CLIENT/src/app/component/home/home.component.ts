import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { LocalStorageService } from '../../service/localStorage.service';
import { Router } from '@angular/router';



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

  ngOnInit(): void {
    const rememberMe = this.localStorage.getItem('rememberMe');
    if (rememberMe === true) { 
      this.router.navigate(['/admin']); 
    }
  }

}

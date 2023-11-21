import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() sidenav!: MatSidenav;
  public isCollapsed: boolean = true;

  toggleMenu() {
    console.log('eed', this.sidenav)
    if (this.sidenav) {
      console.log('here is collapsed');
      this.sidenav.opened;
      this.isCollapsed = !this.isCollapsed;
      console.log('colapsed is', this.isCollapsed);
    } else {
      console.error('MatSidenav is not defined.');
    }
  }

  public login() {
    this.router.navigate(['/login']);
  }


  constructor(public router: Router) {}
}

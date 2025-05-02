import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  name: string = '';

  constructor(private router: Router) {
    this.name = localStorage.getItem('name') || '';
  }

  logout() {
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}

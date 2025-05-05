import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  name: string = '';
  isDarkMode = false;

  constructor(private router: Router) {
    this.name = localStorage.getItem('name') || '';
    this.isDarkMode = document.body.getAttribute('data-bs-theme') === 'dark';
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('selected_customers');
    this.clearSelectedCustomers();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-bs-theme');
    body.setAttribute(
      'data-bs-theme',
      currentTheme === 'dark' ? 'light' : 'dark'
    );
    this.isDarkMode = !this.isDarkMode;
  }

  clearSelectedCustomers() {
    localStorage.setItem('selected_customers', '[]');
    const selectedCustomers = localStorage.getItem('selected_customers');
    console.log(selectedCustomers);
  }
}

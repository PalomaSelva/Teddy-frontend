import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { MenuComponent } from '../shared/components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'host';

  constructor(private router: Router) {}

  shouldShowMenu() {
    const routesWithoutMenu = [
      // '/404',
      '/login',
    ];
    return !routesWithoutMenu.some((route) =>
      window.location.href.includes(route)
    );
  }
}

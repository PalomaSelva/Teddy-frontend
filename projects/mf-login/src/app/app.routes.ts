import { Routes } from '@angular/router';
const title = 'Teddy Open Finance';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    title: `Login | ${title}`,
  },
];

import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      loadRemoteModule('mfLogin', './Component').then((m) => m.LoginComponent),
  },
  {
    path: 'customers',
    loadComponent: () =>
      loadRemoteModule('mfCustomers', './Customers').then(
        (m) => m.CustomersComponent
      ),
    canActivate: [authGuard],
  },
];

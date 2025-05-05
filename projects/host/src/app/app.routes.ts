import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const title = 'Teddy Open Finance';

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
    title: `Login | ${title}`,
  },
  {
    path: 'customers',
    loadComponent: () =>
      loadRemoteModule('mfCustomers', './Customers').then(
        (m) => m.CustomersComponent
      ),
    canActivate: [authGuard],
    title: `Clientes | ${title}`,
  },
  {
    path: 'selected-customers',
    loadComponent: () =>
      loadRemoteModule('mfCustomers', './SelectedCustomers').then(
        (m) => m.SelectedCustomersComponent
      ),
    canActivate: [authGuard],
    title: `Selecionar Clientes | ${title}`,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }, // Rota coringa (deve ser a última)
];

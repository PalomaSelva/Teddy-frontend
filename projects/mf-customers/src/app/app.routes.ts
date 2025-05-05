import { Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { SelectedCustomersComponent } from './pages/selected-customers/selected-customers.component';

const title = 'Teddy Open Finance';

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    title: `Customers | ${title}`,
  },
  {
    path: 'selected-customers',
    component: SelectedCustomersComponent,
    title: `Selected Customers | ${title}`,
  },
];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mf-customers';
}

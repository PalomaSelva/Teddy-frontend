import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerResponse } from '../../shared/interfaces/customer.interface';
import { SelectedCustomersService } from '../../shared/services/selected-customers/selected-customers.service';

@Component({
  selector: 'app-selected-customers',
  imports: [CardComponent, NgxSpinnerModule],
  templateUrl: './selected-customers.component.html',
  styleUrl: './selected-customers.component.scss',
})
export class SelectedCustomersComponent {
  customers: CustomerResponse[] = [];

  constructor(private selectedCustomersService: SelectedCustomersService) {
    this.selectedCustomersService
      .getSelectedCustomers()
      .subscribe((customers) => {
        this.customers = customers;
      });
  }
}

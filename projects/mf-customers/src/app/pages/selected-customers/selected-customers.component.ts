import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerResponse } from '../../shared/interfaces/customer.interface';
import { SelectedCustomersService } from '../../shared/services/selected-customers/selected-customers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-customers',
  imports: [CardComponent, NgxSpinnerModule, CommonModule],
  templateUrl: './selected-customers.component.html',
  styleUrl: './selected-customers.component.scss',
})
export class SelectedCustomersComponent {
  customers: CustomerResponse[] = [];

  constructor(private selectedCustomersService: SelectedCustomersService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedCustomersService
      .getSelectedCustomers()
      .subscribe((customers) => {
        console.log(customers);
        this.customers = customers;
      });
  }

  clearSelectedCustomers() {
    this.selectedCustomersService.clearSelection();
  }
}

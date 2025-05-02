import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import '@angular/localize/init';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../../shared/services/customers/customers.service';
import { CustomerResponse } from '../../shared/interfaces/customer.interface';
import Swal from 'sweetalert2';
import { ModalCreateComponent } from '../../shared/components/modal-create/modal-create.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CardComponent,
    NgbPaginationModule,
    ModalCreateComponent,
    FormsModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  page = 1;
  itemsPerPage = 10;
  customers: CustomerResponse[] = [];
  totalPages = 0;
  totalItems = 0;

  constructor(private _customersService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this._customersService
      .getCustomers(this.page, this.itemsPerPage)
      .subscribe({
        next: (res: any) => {
          this.customers = res.clients;
          this.totalPages = res.totalPages;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        },
      });
  }
}

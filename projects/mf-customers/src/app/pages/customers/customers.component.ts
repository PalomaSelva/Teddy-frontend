import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import '@angular/localize/init';

import { CardComponent } from '../../shared/components/card/card.component';
import { ModalCreateComponent } from '../../shared/components/modal-create/modal-create.component';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';

import { CustomersService } from '../../shared/services/customers/customers.service';

import {
  CustomerRequest,
  CustomerResponse,
} from '../../shared/interfaces/customer.interface';
import { AlertService } from '../../shared/services/alert/alert.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CardComponent,
    NgbPaginationModule,
    ModalCreateComponent,
    FormsModule,
    NgxSpinnerModule,
    ModalDeleteComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  @ViewChild(ModalCreateComponent) modalCreate!: ModalCreateComponent;
  @ViewChild(ModalDeleteComponent) modalDelete!: ModalDeleteComponent;

  page = 1;
  itemsPerPage = 10;
  totalPages = 0;
  totalItems = 0;

  customers: CustomerResponse[] = [];
  selectedCustomer: CustomerResponse | null = null;

  constructor(
    protected _customersService: CustomersService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.spinner.show();
    this._customersService
      .getCustomers(this.page, this.itemsPerPage)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.customers = res.clients;
          this.totalPages = res.totalPages;
        },
        error: (err) => {
          this.spinner.hide();
          this.alertService.error(
            'Erro ao carregar clientes',
            err.error.message
          );
        },
      });
  }

  openDeleteModal(customer: CustomerResponse): void {
    this.selectedCustomer = customer;
  }

  createCustomer(customer: CustomerRequest): void {
    this.spinner.show();
    this._customersService.createCustomer(customer).subscribe({
      next: () => {
        this.spinner.hide();
        this.modalCreate.form.reset();
        this.modalCreate.closeModal();
        this.alertService.success('Cliente criado com sucesso');
        this.getCustomers();
      },
      error: (error: HttpErrorResponse) => {
        this.spinner.hide();
        this.alertService.error('Erro ao criar cliente', error.error.message);
      },
    });
  }

  deleteCustomer(customerId: number): void {
    this.spinner.show();
    this._customersService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.handleSuccessfulDeletion();
      },
      error: (error) => {
        this.handleDeletionError(error);
      },
    });
  }

  private handleSuccessfulDeletion(): void {
    this.spinner.hide();
    this.modalDelete.closeModal();
    this.alertService.success('Cliente excluído com sucesso');
    this.getCustomers();
  }

  private handleDeletionError(error: any): void {
    this.spinner.hide();
    if (error.status === 200) {
      this.handleSuccessfulDeletion();
      return;
    }
    this.alertService.error('Erro ao excluir cliente');
  }
}

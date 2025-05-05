import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import '@angular/localize/init';

import { CardComponent } from '../../shared/components/card/card.component';
import { ModalCreateComponent } from '../../shared/components/modal-create/modal-create.component';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

import { CustomersService } from '../../shared/services/customers/customers.service';
import { SelectedCustomersService } from '../../shared/services/selected-customers/selected-customers.service';

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
    PaginationComponent,
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
    private alertService: AlertService,
    private selectedCustomersService: SelectedCustomersService
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
            err.error.message,
            'Erro ao carregar clientes'
          );
        },
      });
  }

  openDeleteModal(customer: CustomerResponse): void {
    this.selectedCustomer = customer;
  }

  openEditModal(customer: CustomerResponse): void {
    this.selectedCustomer = customer;
  }

  openCreateModal(): void {
    this.modalCreate.resetData();
  }

  handleSaveCustomer(customer: CustomerRequest): void {
    if (this.selectedCustomer) {
      this.updateCustomer(this.selectedCustomer.id, customer);
    } else {
      this.createCustomer(customer);
    }
  }

  updateCustomer(id: number, customer: CustomerRequest): void {
    this.spinner.show();
    this._customersService.updateCustomer(customer, id).subscribe({
      next: () => {
        this.spinner.hide();
        this.modalCreate.closeModal();
        this.alertService.success('Cliente atualizado com sucesso');
        this.getCustomers();
      },
      error: (error: HttpErrorResponse) => {
        this.spinner.hide();
        this.alertService.error(
          error.error.messagem,
          'Erro ao atualizar cliente'
        );
      },
    });
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
        this.alertService.error(error.error.message, 'Erro ao criar cliente');
      },
    });
  }

  deleteCustomer(customerId: number): void {
    this.spinner.show();
    this._customersService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.handleSuccessfulDeletion(customerId);

        console.log(
          'id e users',
          customerId,
          this.selectedCustomersService.getSelectedCustomers()
        );
      },
      error: (error) => {
        this.handleDeletionError(error, customerId);
      },
    });
  }

  private handleSuccessfulDeletion(customerId: number): void {
    this.spinner.hide();
    this.modalDelete.closeModal();
    this.alertService.success('Cliente excluído com sucesso');
    this.getCustomers();
    this.selectedCustomersService.toggleCustomer({
      id: customerId,
    } as CustomerResponse);
  }

  private handleDeletionError(error: any, customerId: number): void {
    this.spinner.hide();
    if (error.status === 200) {
      this.handleSuccessfulDeletion(customerId);

      return;
    }
    this.alertService.error('Erro ao excluir cliente');
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getCustomers();
  }

  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.page = 1; // Reset to first page when changing items per page
    this.getCustomers();
  }
}

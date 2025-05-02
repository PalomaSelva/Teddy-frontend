import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { ModalCreateComponent } from '../modal-create/modal-create.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: CustomerResponse = {
    id: 0,
    name: '',
    salary: 0,
    companyValuation: 0,
    createdAt: '',
    updatedAt: '',
  };
  @Output('selectCustomer') selectCustomerEmitter = new EventEmitter<void>();
  @Output('modalEdit') modalEditEmitter = new EventEmitter<CustomerResponse>();
  @Output('modalDelete') modalDeleteEmitter =
    new EventEmitter<CustomerResponse>();

  selectCustomer() {
    // this.selectCustomerEmitter.emit(this.item);
  }

  openModalEdit(item: CustomerResponse) {
    this.modalEditEmitter.emit(item);
  }

  openModalDelete(item: CustomerResponse) {
    this.modalDeleteEmitter.emit(item);
  }
}

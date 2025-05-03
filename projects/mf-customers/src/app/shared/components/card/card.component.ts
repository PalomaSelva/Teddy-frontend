import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerResponse } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: CustomerResponse;
  @Output() onDelete = new EventEmitter<CustomerResponse>();
  @Output() onEdit = new EventEmitter<CustomerResponse>();

  openDeleteModal(customer: CustomerResponse) {
    this.onDelete.emit(customer);
  }

  editCustomer(customer: CustomerResponse) {
    this.onEdit.emit(customer);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { SelectedCustomersService } from '../../services/selected-customers/selected-customers.service';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgxMaskPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: CustomerResponse;
  @Input() isSelectedCustomersPage = false;
  @Output() onDelete = new EventEmitter<CustomerResponse>();
  @Output() onEdit = new EventEmitter<CustomerResponse>();

  isSelected = false;

  constructor(private selectedCustomersService: SelectedCustomersService) {}

  ngOnInit() {
    this.selectedCustomersService
      .getSelectedCustomers()
      .subscribe((customers) => {
        this.isSelected = customers.some((c) => c.id === this.item?.id);
      });
  }

  toggleSelection(): void {
    this.selectedCustomersService.toggleCustomer(this.item);
  }

  openDeleteModal(customer: CustomerResponse) {
    this.onDelete.emit(customer);
  }

  editCustomer(customer: CustomerResponse) {
    this.onEdit.emit(customer);
  }
}

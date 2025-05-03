import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomerResponse } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-modal-delete',
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  @Input() customer: CustomerResponse | null = null;
  @Output() deleteCustomer = new EventEmitter<number>();
  @ViewChild('closeModal') closeModalElement!: ElementRef<HTMLButtonElement>;

  delete() {
    if (!this.customer) return;
    this.deleteCustomer.emit(this.customer.id);
  }

  closeModal() {
    this.closeModalElement.nativeElement.click();
  }
}

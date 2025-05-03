import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerRequest } from '../../interfaces/customer.interface';
import { CustomersService } from '../../services/customers/customers.service';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'app-modal-create',
  imports: [ReactiveFormsModule, InputTextComponent],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent {
  @ViewChild('closeModal') closeModalElement!: ElementRef<HTMLButtonElement>;
  @Output() saveCustomer: EventEmitter<CustomerRequest> =
    new EventEmitter<CustomerRequest>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected _customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      companyValuation: ['', Validators.required],
    });
  }

  createCustomer() {
    const customer: CustomerRequest = this.form.value;
    this.saveCustomer.emit(customer);
  }

  closeModal() {
    this.closeModalElement.nativeElement.click();
  }

  getControl(control: string) {
    return this.form.get(control) as FormControl;
  }
}

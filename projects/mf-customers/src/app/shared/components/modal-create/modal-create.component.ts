import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
import {
  CustomerRequest,
  CustomerResponse,
} from '../../interfaces/customer.interface';
import { CustomersService } from '../../services/customers/customers.service';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent {
  @ViewChild('closeModal') closeModalElement!: ElementRef<HTMLButtonElement>;
  @Input() customerToEdit?: CustomerResponse | null;
  @Output() saveCustomer: EventEmitter<CustomerRequest> =
    new EventEmitter<CustomerRequest>();

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    protected _customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.customerToEdit) {
      this.isEditMode = true;
      this.initForm();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [this.customerToEdit?.name || '', Validators.required],
      salary: [this.customerToEdit?.salary || '', Validators.required],
      companyValuation: [
        this.customerToEdit?.companyValuation || '',
        Validators.required,
      ],
    });
  }

  save() {
    if (!this.form.valid) return;
    const customer: CustomerRequest = this.form.value;
    this.saveCustomer.emit(customer);
  }

  closeModal() {
    this.resetData();
    this.closeModalElement.nativeElement.click();
  }

  resetData() {
    this.isEditMode = false;
    this.customerToEdit = null;
    this.form.reset();
    console.log(this.customerToEdit, 'reset');
  }

  getControl(control: string) {
    return this.form.get(control) as FormControl;
  }
}

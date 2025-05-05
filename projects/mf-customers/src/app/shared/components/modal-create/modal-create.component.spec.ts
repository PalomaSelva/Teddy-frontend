import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateComponent } from './modal-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';
import { InputTextComponent } from '../input-text/input-text.component';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { of } from 'rxjs';
import { provideNgxMask } from 'ngx-mask';

describe('ModalCreateComponent', () => {
  let component: ModalCreateComponent;
  let fixture: ComponentFixture<ModalCreateComponent>;
  let customersServiceSpy: jasmine.SpyObj<CustomersService>;

  const mockCustomer: CustomerResponse = {
    id: 1,
    name: 'Test Customer',
    salary: 5000,
    companyValuation: 100000,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CustomersService', [
      'createCustomer',
      'updateCustomer',
    ]);
    spy.createCustomer.and.returnValue(of(mockCustomer));
    spy.updateCustomer.and.returnValue(of(mockCustomer));

    await TestBed.configureTestingModule({
      imports: [ModalCreateComponent, ReactiveFormsModule, InputTextComponent],
      providers: [
        FormBuilder,
        { provide: CustomersService, useValue: spy },
        provideNgxMask(),
      ],
    }).compileComponents();

    customersServiceSpy = TestBed.inject(
      CustomersService
    ) as jasmine.SpyObj<CustomersService>;
    fixture = TestBed.createComponent(ModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form in create mode', () => {
    expect(component.form).toBeTruthy();
    expect(component.isEditMode).toBeFalse();
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('salary')?.value).toBe('');
    expect(component.form.get('companyValuation')?.value).toBe('');
  });

  it('should initialize form with customer data in edit mode', () => {
    component.customerToEdit = mockCustomer;
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.form.get('name')?.value).toBe(mockCustomer.name);
    expect(component.form.get('salary')?.value).toBe(mockCustomer.salary);
    expect(component.form.get('companyValuation')?.value).toBe(
      mockCustomer.companyValuation
    );
  });

  it('should have required validators on all fields', () => {
    const nameControl = component.form.get('name');
    const salaryControl = component.form.get('salary');
    const companyValuationControl = component.form.get('companyValuation');

    expect(nameControl?.valid).toBeFalsy();
    expect(salaryControl?.valid).toBeFalsy();
    expect(companyValuationControl?.valid).toBeFalsy();

    expect(nameControl?.errors?.['required']).toBeTruthy();
    expect(salaryControl?.errors?.['required']).toBeTruthy();
    expect(companyValuationControl?.errors?.['required']).toBeTruthy();
  });

  it('should enable save button when form is valid', () => {
    component.form.patchValue({
      name: 'Test Customer',
      salary: 5000,
      companyValuation: 100000,
    });
    fixture.detectChanges();

    const saveButton =
      fixture.nativeElement.querySelector('button.btn-primary');
    expect(saveButton.disabled).toBeFalsy();
  });

  it('should disable save button when form is invalid', () => {
    component.form.patchValue({
      name: '',
      salary: '',
      companyValuation: '',
    });
    fixture.detectChanges();

    const saveButton =
      fixture.nativeElement.querySelector('button.btn-primary');
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should not save customer when form is invalid', () => {
    spyOn(component.saveCustomer, 'emit');
    component.form.patchValue({
      name: '',
      salary: '',
      companyValuation: '',
    });

    component.save();

    expect(component.saveCustomer.emit).not.toHaveBeenCalled();
  });

  it('should reset form and close modal when click in close button', () => {
    spyOn(component.closeModalElement.nativeElement, 'click');
    component.form.patchValue({
      name: 'Test Customer',
      salary: 5000,
      companyValuation: 100000,
    });

    component.closeModal();

    expect(component.form.get('name')?.value).toBeNull();
    expect(component.form.get('salary')?.value).toBeNull();
    expect(component.form.get('companyValuation')?.value).toBeNull();
    expect(component.isEditMode).toBeFalse();
    expect(component.customerToEdit).toBeNull();
    expect(component.closeModalElement.nativeElement.click).toHaveBeenCalled();
  });

  it('should display correct title based on mode', () => {
    // Create mode
    expect(
      fixture.nativeElement.querySelector('.modal-title').textContent.trim()
    ).toBe('Criar cliente');

    // Edit mode
    component.customerToEdit = mockCustomer;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.modal-title').textContent.trim()
    ).toBe('Editar cliente');
  });

  it('should display correct button text based on mode (create and edit)', () => {
    // Create mode
    expect(
      fixture.nativeElement
        .querySelector('button.btn-primary')
        .textContent.trim()
    ).toBe('Salvar');

    // Edit mode
    component.customerToEdit = mockCustomer;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('button.btn-primary')
        .textContent.trim()
    ).toBe('Atualizar');
  });

  it('should have cancel button', () => {
    const cancelButton = fixture.nativeElement.querySelector(
      'button.btn-secondary'
    );
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.textContent.trim()).toBe('Cancelar');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteComponent } from './modal-delete.component';
import { CustomerResponse } from '../../interfaces/customer.interface';

describe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;

  const mockCustomer: CustomerResponse = {
    id: 1,
    name: 'Test Customer',
    salary: 5000,
    companyValuation: 100000,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    component.customer = mockCustomer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null customer', () => {
    component.customer = null;
    fixture.detectChanges();
    expect(component.customer).toBeNull();
  });

  it('should display customer name in modal body', () => {
    const customerName = fixture.nativeElement.querySelector('.fw-bold');
    expect(customerName.textContent.trim()).toBe(mockCustomer.name);
  });

  it('should emit deleteCustomer event with customer id when delete is called', () => {
    spyOn(component.deleteCustomer, 'emit');
    component.delete();
    expect(component.deleteCustomer.emit).toHaveBeenCalledWith(mockCustomer.id);
  });

  it('should not emit deleteCustomer event when customer is null', () => {
    spyOn(component.deleteCustomer, 'emit');
    component.customer = null;
    component.delete();
    expect(component.deleteCustomer.emit).not.toHaveBeenCalled();
  });

  it('should close modal when click in close button', () => {
    spyOn(component.closeModalElement.nativeElement, 'click');
    component.closeModal();
    expect(component.closeModalElement.nativeElement.click).toHaveBeenCalled();
  });

  it('should display warning message with customer name', () => {
    const warningMessage = fixture.nativeElement.querySelector('.modal-body p');
    expect(warningMessage.textContent).toContain(
      'Você está prestes a excluir o cliente:'
    );
    expect(warningMessage.textContent).toContain(mockCustomer.name);
  });

  it('should handle customer name with special characters', () => {
    const customerWithSpecialChars: CustomerResponse = {
      ...mockCustomer,
      name: 'Cliente & Cia. Ltda.',
    };
    component.customer = customerWithSpecialChars;
    fixture.detectChanges();

    const customerName = fixture.nativeElement.querySelector('.fw-bold');
    expect(customerName.textContent.trim()).toBe('Cliente & Cia. Ltda.');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { SelectedCustomersService } from '../../services/selected-customers/selected-customers.service';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { of } from 'rxjs';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let selectedCustomersServiceSpy: jasmine.SpyObj<SelectedCustomersService>;

  const mockCustomer: CustomerResponse = {
    id: 1,
    name: 'Test Customer',
    salary: 5000,
    companyValuation: 100000,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SelectedCustomersService', [
      'getSelectedCustomers',
      'toggleCustomer',
    ]);
    spy.getSelectedCustomers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CardComponent, NgxMaskPipe],
      providers: [
        { provide: SelectedCustomersService, useValue: spy },
        provideNgxMask(),
      ],
    }).compileComponents();

    selectedCustomersServiceSpy = TestBed.inject(
      SelectedCustomersService
    ) as jasmine.SpyObj<SelectedCustomersService>;
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.item = mockCustomer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isSelected as false', () => {
    expect(component.isSelected).toBeFalse();
  });

  it('should update isSelected when customer is in selected customers list', () => {
    selectedCustomersServiceSpy.getSelectedCustomers.and.returnValue(
      of([mockCustomer])
    );
    fixture.detectChanges();
    expect(component.isSelected).toBeTrue();
  });

  it('should call toggleCustomer when the card is selected', () => {
    component.toggleSelection();
    expect(selectedCustomersServiceSpy.toggleCustomer).toHaveBeenCalledWith(
      mockCustomer
    );
  });

  it('should emit onDelete event when openDeleteModal is called', () => {
    spyOn(component.onDelete, 'emit');
    component.openDeleteModal(mockCustomer);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockCustomer);
  });

  it('should emit onEdit event when editCustomer is called', () => {
    spyOn(component.onEdit, 'emit');
    component.editCustomer(mockCustomer);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockCustomer);
  });

  it('should show only minus icon when the card is in the selected customers page', () => {
    component.isSelectedCustomersPage = true;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(1); // Only the minus button should be visible
    expect(
      buttons[0].querySelector('i').classList.contains('fa-minus')
    ).toBeTrue();
  });

  it('should show all buttons when o card is not in the selected customers page', () => {
    component.isSelectedCustomersPage = false;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(3); // All three buttons should be visible
  });
});

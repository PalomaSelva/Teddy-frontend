import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { CustomersComponent } from './customers.component';
import { CustomersService } from '../../shared/services/customers/customers.service';
import { AlertService } from '../../shared/services/alert/alert.service';
import { SelectedCustomersService } from '../../shared/services/selected-customers/selected-customers.service';
import { CustomerResponse } from '../../shared/interfaces/customer.interface';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customersServiceSpy: jasmine.SpyObj<CustomersService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let selectedCustomersServiceSpy: jasmine.SpyObj<SelectedCustomersService>;

  const mockCustomers: CustomerResponse[] = [
    {
      id: 1,
      name: 'John Doe',
      salary: 5000,
      companyValuation: 100000,
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      salary: 6000,
      companyValuation: 150000,
      createdAt: '2024-03-20T11:00:00Z',
      updatedAt: '2024-03-20T11:00:00Z',
    },
  ];

  beforeEach(async () => {
    const customersSpy = jasmine.createSpyObj('CustomersService', [
      'getCustomers',
      'createCustomer',
      'updateCustomer',
      'deleteCustomer',
    ]);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
    ]);
    const alertSpy = jasmine.createSpyObj('AlertService', ['success', 'error']);
    const selectedCustomersSpy = jasmine.createSpyObj(
      'SelectedCustomersService',
      ['toggleCustomer']
    );

    await TestBed.configureTestingModule({
      imports: [
        CustomersComponent,
        FormsModule,
        NgbPaginationModule,
        NgxSpinnerModule,
      ],
      providers: [
        { provide: CustomersService, useValue: customersSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: AlertService, useValue: alertSpy },
        { provide: SelectedCustomersService, useValue: selectedCustomersSpy },
      ],
    }).compileComponents();

    customersServiceSpy = TestBed.inject(
      CustomersService
    ) as jasmine.SpyObj<CustomersService>;
    spinnerServiceSpy = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;
    alertServiceSpy = TestBed.inject(
      AlertService
    ) as jasmine.SpyObj<AlertService>;
    selectedCustomersServiceSpy = TestBed.inject(
      SelectedCustomersService
    ) as jasmine.SpyObj<SelectedCustomersService>;

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customers on init', fakeAsync(() => {
    const mockResponse = { clients: mockCustomers, totalPages: 2 };
    customersServiceSpy.getCustomers.and.returnValue(of(mockResponse));

    component.ngOnInit();
    tick();

    expect(customersServiceSpy.getCustomers).toHaveBeenCalledWith(1, 10);
    expect(component.customers).toEqual(mockCustomers);
    expect(component.totalPages).toBe(2);
    expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should handle error when loading customers', fakeAsync(() => {
    const errorResponse = { error: { message: 'Error loading customers' } };
    customersServiceSpy.getCustomers.and.returnValue(
      throwError(() => errorResponse)
    );

    component.getCustomers();
    tick();

    expect(alertServiceSpy.error).toHaveBeenCalledWith(
      'Error loading customers',
      'Erro ao carregar clientes'
    );
    expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should update page and load customers when page changes', fakeAsync(() => {
    const mockResponse = { clients: mockCustomers, totalPages: 2 };
    customersServiceSpy.getCustomers.and.returnValue(of(mockResponse));

    component.onPageChange(2);
    tick();

    expect(component.page).toBe(2);
    expect(customersServiceSpy.getCustomers).toHaveBeenCalledWith(2, 10);
  }));

  it('should update items per page and reset to first page', fakeAsync(() => {
    const mockResponse = { clients: mockCustomers, totalPages: 2 };
    customersServiceSpy.getCustomers.and.returnValue(of(mockResponse));

    component.onItemsPerPageChange(20);
    tick();

    expect(component.itemsPerPage).toBe(20);
    expect(component.page).toBe(1);
    expect(customersServiceSpy.getCustomers).toHaveBeenCalledWith(1, 20);
  }));

  it('should set selected customer when opening delete modal', () => {
    const customer = mockCustomers[0];
    component.openDeleteModal(customer);
    expect(component.selectedCustomer).toEqual(customer);
  });

  it('should set selected customer when opening edit modal', () => {
    const customer = mockCustomers[0];
    component.openEditModal(customer);
    expect(component.selectedCustomer).toEqual(customer);
  });
});

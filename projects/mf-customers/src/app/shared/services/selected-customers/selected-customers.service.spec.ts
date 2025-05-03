import { TestBed } from '@angular/core/testing';
import { SelectedCustomersService } from './selected-customers.service';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { BehaviorSubject } from 'rxjs';

describe('SelectedCustomersService', () => {
  let service: SelectedCustomersService;
  let selectedCustomersSubject: BehaviorSubject<CustomerResponse[]>;

  const mockCustomer1: CustomerResponse = {
    id: 1,
    name: 'Test Customer 1',
    salary: 5000,
    companyValuation: 100000,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  };

  const mockCustomer2: CustomerResponse = {
    id: 2,
    name: 'Test Customer 2',
    salary: 6000,
    companyValuation: 200000,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  };

  beforeEach(() => {
    selectedCustomersSubject = new BehaviorSubject<CustomerResponse[]>([]);

    TestBed.configureTestingModule({
      providers: [SelectedCustomersService],
    });

    service = TestBed.inject(SelectedCustomersService);
    // @ts-ignore - accessing private property for testing
    service['selectedCustomersSubject'] = selectedCustomersSubject;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty selected customers', () => {
    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([]);
    });
  });

  it('should add customer when not in selected list', () => {
    service.toggleCustomer(mockCustomer1);

    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([mockCustomer1]);
    });
  });

  it('should remove customer when already in selected list', () => {
    // First add the customer
    service.toggleCustomer(mockCustomer1);

    // Then remove it
    service.toggleCustomer(mockCustomer1);

    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([]);
    });
  });

  it('should handle multiple customers correctly', () => {
    // Add first customer
    service.toggleCustomer(mockCustomer1);

    // Add second customer
    service.toggleCustomer(mockCustomer2);

    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([mockCustomer1, mockCustomer2]);
    });

    // Remove first customer
    service.toggleCustomer(mockCustomer1);

    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([mockCustomer2]);
    });
  });

  it('should clear all selected customers', () => {
    // Add customers
    service.toggleCustomer(mockCustomer1);
    service.toggleCustomer(mockCustomer2);

    // Clear all
    service.clearSelection();

    service.getSelectedCustomers().subscribe((customers) => {
      expect(customers).toEqual([]);
    });
  });
});

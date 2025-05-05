import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectedCustomersService } from './selected-customers.service';
import { CustomerResponse } from '../../interfaces/customer.interface';
import { firstValueFrom } from 'rxjs';

describe('SelectedCustomersService', () => {
  let service: SelectedCustomersService;

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
    TestBed.configureTestingModule({
      providers: [SelectedCustomersService],
    });
    service = TestBed.inject(SelectedCustomersService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty selected customers', async () => {
    const customers = await firstValueFrom(service.getSelectedCustomers());
    expect(customers).toEqual([]);
  });

  it('should add customer when not in selected list', async () => {
    service.toggleCustomer(mockCustomer1);
    const customers = await firstValueFrom(service.getSelectedCustomers());
    expect(customers).toEqual([mockCustomer1]);
  });

  it('should handle multiple customers correctly', async () => {
    // Seleciona um
    service.toggleCustomer(mockCustomer1);
    // Seleciona outro
    service.toggleCustomer(mockCustomer2);

    // Verifica se os dois estão selecionados
    let customers = await firstValueFrom(service.getSelectedCustomers());
    expect(customers.length).toBe(2);
    expect(customers).toContain(mockCustomer1);
    expect(customers).toContain(mockCustomer2);

    // Remove um
    service.toggleCustomer(mockCustomer1);

    // Verifica se o outro está selecionado
    customers = await firstValueFrom(service.getSelectedCustomers());
    expect(customers.length).toBe(1);
    expect(customers).toContain(mockCustomer2);
  });

  it('should clear all selected customers', async () => {
    service.toggleCustomer(mockCustomer1);
    service.toggleCustomer(mockCustomer2);

    service.clearSelection();

    const customers = await firstValueFrom(service.getSelectedCustomers());
    expect(customers).toEqual([]);
  });
});

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerResponse } from '../../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedCustomersService {
  private readonly STORAGE_KEY = 'selected_customers';
  private selectedCustomers = new BehaviorSubject<CustomerResponse[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.selectedCustomers.next(JSON.parse(stored));
    }
  }

  private saveToStorage(customers: CustomerResponse[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customers));
    this.selectedCustomers.next(customers);
  }

  getSelectedCustomers(): Observable<CustomerResponse[]> {
    return this.selectedCustomers.asObservable();
  }

  isCustomerSelected(customerId: number): boolean {
    return this.selectedCustomers.value.some((c) => c.id === customerId);
  }

  toggleCustomer(customer: CustomerResponse): void {
    const current = this.selectedCustomers.value;
    const isSelected = this.isCustomerSelected(customer.id);

    if (isSelected) {
      this.saveToStorage(current.filter((c) => c.id !== customer.id));
    } else {
      this.saveToStorage([...current, customer]);
    }
  }

  clearSelection(): void {
    this.saveToStorage([]);
  }
}

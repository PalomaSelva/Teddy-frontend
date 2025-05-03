import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerRequest } from '../../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomers(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get(`${environment.apiUrl}/users`, { params });
  }

  createCustomer(customer: CustomerRequest) {
    return this.http.post(`${environment.apiUrl}/users`, customer);
  }

  updateCustomer(customer: CustomerRequest, id: number) {
    return this.http.patch(`${environment.apiUrl}/users/${id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}

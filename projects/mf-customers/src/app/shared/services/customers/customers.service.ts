import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get(`${environment.apiUrl}/customers`);
  }
}

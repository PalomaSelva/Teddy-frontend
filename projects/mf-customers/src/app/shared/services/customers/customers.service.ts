import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

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
}

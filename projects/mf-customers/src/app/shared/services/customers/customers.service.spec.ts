import { TestBed } from '@angular/core/testing';
import { CustomersService } from './customers.service';
import { provideHttpClient } from '@angular/common/http';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CustomersService, provideHttpClient()],
    });
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

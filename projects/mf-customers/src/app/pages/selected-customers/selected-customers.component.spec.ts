import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SelectedCustomersComponent } from './selected-customers.component';
import { SelectedCustomersService } from '../../shared/services/selected-customers/selected-customers.service';
import { CustomerResponse } from '../../shared/interfaces/customer.interface';
import { of } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideNetlifyLoader } from '@angular/common';
import { provideNgxMask } from 'ngx-mask';

describe('SelectedCustomersComponent', () => {
  let component: SelectedCustomersComponent;
  let fixture: ComponentFixture<SelectedCustomersComponent>;
  let selectedCustomersServiceSpy: jasmine.SpyObj<SelectedCustomersService>;

  const mockCustomers: CustomerResponse[] = [
    {
      id: 1,
      name: 'Test Customer 1',
      salary: 5000,
      companyValuation: 100000,
      createdAt: '2024-03-20T00:00:00.000Z',
      updatedAt: '2024-03-20T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'Test Customer 2',
      salary: 6000,
      companyValuation: 200000,
      createdAt: '2024-03-20T00:00:00.000Z',
      updatedAt: '2024-03-20T00:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SelectedCustomersService', [
      'getSelectedCustomers',
    ]);
    spy.getSelectedCustomers.and.returnValue(of(mockCustomers));

    await TestBed.configureTestingModule({
      imports: [SelectedCustomersComponent, CardComponent, NgxSpinnerModule],
      providers: [
        { provide: SelectedCustomersService, useValue: spy },
        provideNetlifyLoader(),
        provideNgxMask(),
      ],
    }).compileComponents();

    selectedCustomersServiceSpy = TestBed.inject(
      SelectedCustomersService
    ) as jasmine.SpyObj<SelectedCustomersService>;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load selected customers on init', () => {
    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(selectedCustomersServiceSpy.getSelectedCustomers).toHaveBeenCalled();
    expect(component.customers).toEqual(mockCustomers);
  });

  it('should display correct number of customer cards', () => {
    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(mockCustomers.length);
  });

  it('should have a clear selected customers button when there are selected customers', () => {
    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '#clear-selected-customers'
    );

    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Limpar clientes selecionados');
  });

  it('should not have a clear selected customers button when there are no selected customers', fakeAsync(() => {
    selectedCustomersServiceSpy.getSelectedCustomers.and.returnValue(of([]));

    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(); // Wait for async operations

    const button = fixture.nativeElement.querySelector(
      '#clear-selected-customers'
    );
    expect(button).toBeFalsy();
  }));
});

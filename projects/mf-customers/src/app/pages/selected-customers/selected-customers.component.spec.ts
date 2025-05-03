import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCustomersComponent } from './selected-customers.component';

describe('SelectedCustomersComponent', () => {
  let component: SelectedCustomersComponent;
  let fixture: ComponentFixture<SelectedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

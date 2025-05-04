import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, FormsModule, NgbPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.totalPages).toBe(0);
    expect(component.page).toBe(1);
    expect(component.itemsPerPage).toBe(10);
    expect(component.itemsPerPageOptions).toEqual([10, 20, 30, 40]);
  });

  it('should emit pageChange event when page changes', () => {
    spyOn(component.pageChange, 'emit');
    const newPage = 2;
    component.onPageChange(newPage);
    expect(component.pageChange.emit).toHaveBeenCalledWith(newPage);
  });

  it('should emit itemsPerPageChange event when items per page changes', () => {
    spyOn(component.itemsPerPageChange, 'emit');
    const newItemsPerPage = 20;
    component.onItemsPerPageChange(newItemsPerPage);
    expect(component.itemsPerPageChange.emit).toHaveBeenCalledWith(
      newItemsPerPage
    );
  });

  it('should update itemsPerPage when select changes', () => {
    const select = fixture.nativeElement.querySelector('select');
    const newValue = '20';

    select.value = newValue;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.itemsPerPage.toString()).toBe(newValue);
  });

  it('should display correct label for items per page', () => {
    const label = fixture.nativeElement.querySelector('p');
    expect(label.textContent.trim()).toBe('Itens por página:');
  });

  it('should handle zero total pages', () => {
    component.totalPages = 0;
    fixture.detectChanges();

    const pagination = fixture.nativeElement.querySelector('ngb-pagination');
    expect(pagination).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, RouterTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with name from localStorage', () => {
    const testName = 'John Doe';
    localStorage.setItem('name', testName);

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.name).toBe(testName);
  });

  it('should initialize with correct theme state', () => {
    document.body.setAttribute('data-bs-theme', 'dark');

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isDarkMode).toBe(true);
  });

  it('should toggle theme correctly', () => {
    document.body.setAttribute('data-bs-theme', 'light');
    component.isDarkMode = false;

    component.toggleTheme();
    expect(component.isDarkMode).toBe(true);
    expect(document.body.getAttribute('data-bs-theme')).toBe('dark');

    component.toggleTheme();
    expect(component.isDarkMode).toBe(false);
    expect(document.body.getAttribute('data-bs-theme')).toBe('light');
  });

  it('should clear localStorage and navigate to login on logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    localStorage.setItem('name', 'Test User');
    localStorage.setItem('selected_customers', '[{"id": 1}]');

    component.logout();

    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('selected_customers')).toBe('[]');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should clear selected customers', () => {
    localStorage.setItem('selected_customers', '[{"id": 1}]');

    component.clearSelectedCustomers();

    expect(localStorage.getItem('selected_customers')).toBe('[]');
  });
});

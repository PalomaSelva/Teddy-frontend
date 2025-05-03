import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('name')?.value).toBe('');
  });

  it('should have name field with required validator', () => {
    const nameControl = component.form.get('name');
    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.errors?.['required']).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('John Doe');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should navigate to customers page on successful login', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem');

    const nameControl = component.form.get('name');
    nameControl?.setValue('John Doe');
    component.login();

    expect(localStorage.setItem).toHaveBeenCalledWith('name', 'John Doe');
    expect(router.navigate).toHaveBeenCalledWith(['/customers']);
  });

  it('should not navigate or save to localStorage when form is invalid', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem');

    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    component.login();

    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to customers page if user is already logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('John Doe');
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/customers']);
  });

  it('should not redirect if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should display welcome message', () => {
    const welcomeMessage = fixture.nativeElement.querySelector('h1');
    expect(welcomeMessage.textContent).toContain('Olá, seja bem-vindo!');
  });

  it('should have input field with correct placeholder', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Digite o seu nome:');
  });

  it('should have submit button with correct text', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton.textContent.trim()).toBe('Entrar');
  });
});

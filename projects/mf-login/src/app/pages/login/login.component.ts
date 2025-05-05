import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('name')) {
      this.router.navigate(['/customers']);
    }
  }

  login() {
    if (this.form.valid) {
      const { name } = this.form.getRawValue();
      localStorage.setItem('name', name);
      localStorage.setItem('selected_customers', JSON.stringify([]));
      this.router.navigate(['/customers']);
    }
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      companyValuation: ['', Validators.required],
    });
  }
}

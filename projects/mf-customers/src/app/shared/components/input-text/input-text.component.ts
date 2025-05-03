import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ErrorMessageService } from '../../services/error-message/error-message.service';

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() currency: boolean = false;
  @Input() maxlength?: string;
  @Input() minlength?: string;
  @Input() readOnly?: boolean;
  @Output() input = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  maskOptions: any = {};

  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['currency']) {
      this.mask = 'separator.2';
      this.maskOptions = {
        separator: ',',
        thousandSeparator: '.',
        prefix: 'R$ ',
        allowNegative: false,
      };
    }
  }

  get errorMessage(): string | null {
    const message = this.errorMessageService.getErrorMessage(this.control);

    return message;
  }
}

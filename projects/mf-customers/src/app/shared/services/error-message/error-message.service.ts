import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private messages: { [key: string]: string } = {
    required: 'Este campo é obrigatório.',
    email: 'E-mail inválido.',
    minlength: 'O mínimo de caracteres é {requiredLength}.',
    maxlength: 'O máximo de caracteres é {requiredLength}.',
    pattern: 'O formato é inválido.',
    uppercase: 'A senha deve conter letras maiúsculas.',
    lowercase: 'A senha deve conter letras minúsculas.',
    number: 'A senha deve conter números.',
    special: 'A senha deve conter caracteres especiais.',
    mask: 'O formato é inválido',
  };

  getErrorMessage(control: AbstractControl) {
    if (control.errors) {
      const error = control.errors;

      if (error && error['message']) {
        return error['message'];
      }
      const errorKey = Object.keys(error)[0];

      let message = this.messages[errorKey];
      if (errorKey === 'min') {
        message = message.replace('{min}', error['min'].min);
      } else if (errorKey === 'max') {
        message = message.replace('{max}', error['max'].max);
      } else if (errorKey === 'minlength' || errorKey === 'maxlength') {
        errorKey.replace('length', 'Length');
        message = message.replace(
          '{requiredLength}',
          error[errorKey].requiredLength
        );
      }
      return message;
    }
    return null;
  }
}

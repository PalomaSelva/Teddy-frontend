import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  swalMixin = Swal.mixin({
    customClass: {
      popup: 'bg-body',
      confirmButton: 'bg-primary',

      title: 'text-body',
      htmlContainer: 'text-body',
    },
    reverseButtons: true,
  });

  success(message: string, title: string = 'Sucesso') {
    this.swalMixin.fire({
      title,
      text: message,
      icon: 'success',
    });
  }

  error(message: string, title: string = 'Erro') {
    this.swalMixin.fire({
      title,
      text: message,
      icon: 'error',
    });
  }

  warning(message: string, title: string = 'Atenção') {
    this.swalMixin.fire({
      title,
      text: message,
      icon: 'warning',
    });
  }

  info(message: string, title: string = 'Informação') {
    this.swalMixin.fire({
      title,
      text: message,
      icon: 'info',
    });
  }

  customAlert(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    return this.swalMixin.fire({
      icon: 'info',
      reverseButtons: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      ...options,
    });
  }
}

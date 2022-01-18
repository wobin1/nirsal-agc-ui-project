import { Injectable } from '@angular/core';

declare var require
const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  error(title, text, footer='') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer
    })
  }

  // A warning
  warning(title, text, footer='', showConfirmButton = true) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      footer: footer,
      showConfirmButton: showConfirmButton
    });
  }

  // A warning
  success(title, text, footer='', showConfirmButton = true) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      footer: footer,
      showConfirmButton: showConfirmButton,
    });
  }

  // Info
  info(title, text, footer='', showConfirmButton = true) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      footer: footer,
      showConfirmButton: showConfirmButton
    });
  }

  // Danger
  danger(title, text, footer='', showConfirmButton = true) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer,
      showConfirmButton: showConfirmButton
    });
  }
}

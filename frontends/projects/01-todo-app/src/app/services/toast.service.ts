import { Injectable } from '@angular/core';
import { Toast } from '../models/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];

  private show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccess(message: string) {
    this.show({
      message,
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  showDanger(message: string) {
    this.show({
      message,
      classname: 'bg-danger text-light',
      delay: 3000,
    });
  }

}

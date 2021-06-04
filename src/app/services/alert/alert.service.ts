import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  show: boolean = false;
  message: string;
  type: string = 'info';
  timer: any;

  constructor() {}

  alert(message: string, type: string = 'info', autohide: number = 5000) {
    this.show = true;
    this.message = message;
    this.type = type;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (autohide) {
      this.timer = setTimeout(() => {
        this.close();
      }, autohide);
    }
  }

  close() {
    this.show = false;
  }
}

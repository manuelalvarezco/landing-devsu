import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <div class="d-flex align-items-center justify-content-center header">
    <img src="https://www.bancopichincha.com.co/o/pichincha-theme/images/logo.png" alt="Logo">
  </div>`,
  styles: ['.header { padding: 55px; }']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

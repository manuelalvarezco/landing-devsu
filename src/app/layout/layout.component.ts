import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-navbar />
    <p>home works!</p>
  `,  
  styleUrl: './home.component.scss',
  imports: [NavbarComponent],
})
export class HomeComponent {}

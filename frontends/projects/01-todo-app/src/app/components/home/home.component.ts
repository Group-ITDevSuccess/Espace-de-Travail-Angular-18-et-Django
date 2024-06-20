import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-navbar />
    <section>
      
    </section>
  `,
  styleUrl: './home.component.scss',
  imports: [CommonModule, NavbarComponent],
})
export class HomeComponent {

}

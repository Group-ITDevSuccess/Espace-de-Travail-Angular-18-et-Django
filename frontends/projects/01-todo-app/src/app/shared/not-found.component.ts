import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div align="center">
      <h2>La page Not Found</h2>
      <a routerLink="/home">Page D'acceuil</a>
    </div>
  `,
  styles: ``,
})
export class NotFoundComponent {}

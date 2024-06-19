import { AuthsService } from './../services/auths.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/home"  >
          <img
            src="ITDevSuccess(Black).png"
            alt="Logo"
            width="30"
            class="d-inline-block align-text-top"
          />
          TodoApp
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" routerLink="/home" routerLinkActive="active fw-bold">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" routerLinkActive="active fw-bold">Administration</a>
            </li>
          </ul>
          <div class="d-flex" role="search">

            <button class="btn btn-outline-danger" (click)="logoutClick()">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  private authService = inject(AuthsService)

  logoutClick(){
    this.authService.logoutUser()
  }
}

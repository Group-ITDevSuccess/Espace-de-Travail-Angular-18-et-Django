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
        <a class="navbar-brand" routerLink="/home">
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
              <a
                class="nav-link"
                aria-current="page"
                routerLink="/home"
                routerLinkActive="active fw-bold"
                ><i class="bi bi-house-door mx-1"></i> Acceuil</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                routerLinkActive="active fw-bold"
                ><i class="bi bi-clipboard-check mx-1"></i> Administration</a
              >
            </li>
          </ul>
          <ul class="navbar-nav d-flex flex-row me-1">
            <li class="nav-item me-3 me-lg-0">
              <a class="nav-link" href="#">
                <i class="bi bi-envelope mx-1"></i> Contact
              </a>
            </li>
            <li class="nav-item me-3 me-lg-0">
              <a class="nav-link" href="#">
                <i class="bi bi-gear mx-1"></i> Settings
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person mx-1"></i> Profile
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a class="dropdown-item" href="#">Mon Compte</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Log out</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button class="btn btn-outline-danger" (click)="logoutClick()">
            <i class="bi bi-box-arrow-right  mx-1"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  private authService = inject(AuthsService);

  logoutClick() {
    this.authService.logoutUser();
  }
}

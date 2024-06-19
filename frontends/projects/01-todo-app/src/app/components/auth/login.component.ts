import { User } from './../../models/User';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthsService } from '../../services/auths.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="forms">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h4 class="heading-section">Connexion TodoApp</h4>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="auths-wrap p-4 p-md-5 shadow">
              <div
                class="icon d-flex align-items-center justify-content-center bg-white text-success"
              >
                <div class="logo">
                  <img src="ITDevSuccess(Black).png" alt="" />
                </div>
              </div>
              <h3 class="text-center mb-4 text-success">Identifiez-vous</h3>
              <form [formGroup]="loginForm">
                <div class="form-group">
                  <input
                    type="text"
                    formControlName="username"
                    id="username"
                    placeholder="Votre Identifiant"
                    class="form-control"
                  />
                </div>
                <div class="form-group d-flex">
                  <input
                    type="password"
                    formControlName="password"
                    id="password"
                    placeholder="Votre Mot de Passe"
                    autocomplete="off"
                    class="form-control"
                  />
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-100 mb-5">
                    <div class="form-group">
                      <button
                        type="submit"
                        class="submit btn btn-success rounded p-3 px-5"
                        [disabled]="!loginForm.valid"
                        (click)="onSubmit()"
                      >
                        Connexion
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <span
                    >Vous n'avez pas un compte ?
                    <a routerLink="signin" title="Se connecter"
                      ><i class="bi bi-box-arrow-in-right"></i></a
                  ></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `@import './auth.component.scss';`,
})
export class LoginComponent {
  private authService = inject(AuthsService);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const user: User = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    console.log('User : ', user, this.loginForm);

    this.authService.loginUser(user).subscribe((value) => {
      console.log('Value: ', value);
    });
  }
}

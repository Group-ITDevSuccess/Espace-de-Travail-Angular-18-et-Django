import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="forms">
      <div class="container">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h3 class="text-center  ">Connexion</h3>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                  <div class="mb-3">
                    <label for="username" class="form-label">Identifiant</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      formControlName="username"
                      placeholder="Entrez votre identifiant"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label"
                      >Mot de passe</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      formControlName="password"
                      placeholder="Entrez votre mot de passe"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid"
                  >
                    Se Connecter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `@import './auth.component.scss';`,
})
export default class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {}
}

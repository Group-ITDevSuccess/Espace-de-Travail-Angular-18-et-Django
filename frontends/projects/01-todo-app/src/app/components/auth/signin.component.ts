import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="forms">
      <div class="container">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h3 class="text-center mb-4">Inscription</h3>
                <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-4">
                  <div class="row mb-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        formControlName="username"
                        placeholder="Entrez votre identifiant"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        formControlName="email"
                        placeholder="Entrez votre email"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nom"
                        formControlName="first_name"
                        aria-label="Nom"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Prénom"
                        formControlName="last_name"
                        aria-label="Prénom"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        formControlName="password"
                        placeholder="Entrez votre mot de passe"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="password"
                        class="form-control"
                        id="password-verification"
                        formControlName="password_verification"
                        placeholder="Entrez encore votre mot de passe"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary mt-2"
                    [disabled]="registerForm.invalid"
                  >
                    S'inscrire
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
export default class SigninComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl('', Validators.required),
    password_verification: new FormControl('', [Validators.required]),
  });
  onSubmit() {}
}

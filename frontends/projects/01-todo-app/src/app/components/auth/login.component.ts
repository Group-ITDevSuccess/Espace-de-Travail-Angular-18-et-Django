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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
                    [disabled]="!loginForm.valid"
                  >
                    Se Connecter
                  </button>
                  <!-- <p>Validation du formualre : {{ loginForm.valid }}</p>
                  <p>{{ loginForm.value | json }}</p> -->
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

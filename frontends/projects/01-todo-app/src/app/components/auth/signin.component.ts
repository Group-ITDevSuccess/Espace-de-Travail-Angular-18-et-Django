import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="forms">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h4 class="heading-section">Inscription TodoApp</h4>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="auths-wrap p-4 p-md-5 shadow">
              <div
                class="icon d-flex align-items-center justify-content-center bg-white text-success"
              >
                <div class="logo">
                  <img src="ITDevSuccess(Black).png" alt="" />
                </div>
              </div>
              <h3 class="text-center mb-4 text-success">Votre Information</h3>
              <form [formGroup]="registerForm">
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        formControlName="username"
                        id="username"
                        placeholder="Identifiant ou Pseudo"
                        class="form-control"
                        required="true"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="email"
                        formControlName="email"
                        id="email"
                        placeholder="Adresse Email"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        formControlName="first_name"
                        id="first_name"
                        placeholder="Nom"
                        class="form-control"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        formControlName="last_name"
                        id="last_name"
                        placeholder="Prénom"
                        class="form-control"
                      />
                    </div>
                  </div>
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
                <div class="form-group d-flex">
                  <input
                    type="password"
                    formControlName="password_verification"
                    id="password_verification"
                    placeholder="Reverifier Votre Mot de Passe"
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
                        [disabled]="!registerForm.valid"
                        (click)="onSubmit()"
                      >
                        S'inscrire
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <span
                    >Vous avez déja un compte ?
                    <a routerLink="/accounts/login"
                      ><i class="bi bi-box-arrow-in-left"></i> </a
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
export class SigninComponent {
  public registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email]),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        password: new FormControl('', Validators.required),
        password_verification: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  onSubmit() {
    const user: User = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      first_name: this.registerForm.value.first_name!,
      last_name: this.registerForm.value.last_name!,
      password: this.registerForm.value.password!,
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordVerification = control.get('password_verification')?.value;
    console.log(password, '===', passwordVerification);
    if (password !== passwordVerification) {
      return { passwordMismatch: true };
    }
    return null;
  }
}

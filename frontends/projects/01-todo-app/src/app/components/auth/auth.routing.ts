import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SigninComponent } from './signin.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: SigninComponent,
      }
    ]
  },
];


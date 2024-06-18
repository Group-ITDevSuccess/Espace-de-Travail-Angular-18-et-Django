import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'accounts',
    loadComponent: () => import('./components/auth/auth.component') ,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/auth/login.component')
      },
      {
        path: 'signin',
        loadComponent: () => import('./components/auth/signin.component')
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

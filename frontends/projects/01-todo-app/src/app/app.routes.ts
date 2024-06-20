import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './shared/not-found.component';
import { homeGuard } from './guard/home.guard';
import { authGuard } from './guard/auth.guard'; // Import the auth guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./components/auth/auth.routing').then((m) => m.AuthRoutes),
    canActivate: [homeGuard],
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundComponent,
  },
];

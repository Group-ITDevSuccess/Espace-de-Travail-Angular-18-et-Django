import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './shared/not-found.component';
import { homeGuard } from './guard/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [homeGuard],
    component: HomeComponent,
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./components/auth/auth.routing').then((m) => m.AuthRoutes),
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundComponent,
  },
];

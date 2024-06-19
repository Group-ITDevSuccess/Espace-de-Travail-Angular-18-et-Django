import {
  CanActivateChildFn,
  Router,
} from '@angular/router';
import { AuthsService } from '../services/auths.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authServiceIsLogin = inject(AuthsService).isLoggedIn;
  const router = inject(Router);

  if (authServiceIsLogin == true) {
    router.navigate(['/home']);
  }
  return authServiceIsLogin;
};

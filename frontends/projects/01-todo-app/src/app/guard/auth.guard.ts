import { CanActivateChildFn, Router } from '@angular/router';
import { AuthsService } from '../services/auths.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthsService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    router.navigate(['/accounts/login']);
    return false;
  }
  return true;
};

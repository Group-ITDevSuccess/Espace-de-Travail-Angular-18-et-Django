import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthsService } from '../services/auths.service';

export const homeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthsService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

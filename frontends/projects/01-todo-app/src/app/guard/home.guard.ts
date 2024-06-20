import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthsService } from '../services/auths.service';

export const homeGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthsService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

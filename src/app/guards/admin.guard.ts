import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  let auth = false;

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  authService.user$.subscribe((user) => {
    if (user.userType === 'admin') {
      auth = true;
    } else {
      auth = false;
      router.navigateByUrl('');
    }
  });
  return auth;
};

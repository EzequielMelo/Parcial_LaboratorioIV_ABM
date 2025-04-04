import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  let auth = false;

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  authService.authUser$.subscribe((respuesta) => {
    if (respuesta != null) {
      auth = true;
    } else {
      auth = false;
      router.navigateByUrl('');
    }
  });
  return auth;
};

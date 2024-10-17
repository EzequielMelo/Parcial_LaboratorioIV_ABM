import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServiceService);
  console.log(auth.usuarioActual);
  return auth.usuarioActual !== null;
};

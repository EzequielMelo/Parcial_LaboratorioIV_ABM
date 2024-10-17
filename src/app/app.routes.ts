import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full',
  },
  {
    path: 'bienvenida',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'alta-productos',
    loadComponent: () =>
      import('./pages/alta-producto/alta-producto.component').then(
        (c) => c.AltaProductoComponent
      ),
    canActivate: [authGuard],
  },
];

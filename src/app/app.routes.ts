import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

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
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
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
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos.component').then(
        (c) => c.ProductosComponent
      ),
  },
  {
    path: 'containers',
    loadComponent: () =>
      import('./pages/containers/containers.component').then(
        (c) => c.ContainersComponent
      ),
    canActivate: [authGuard, adminGuard],
  },
];

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public usuarioActual: null | object = null;

  loguear(nombre: string, contrasenia: string) {
    if (nombre == 'admin') {
      this.usuarioActual = {
        nombre: nombre,
        contrasenia: contrasenia,
        userType: 'admin',
      };
    } else {
      this.usuarioActual = {
        nombre: nombre,
        contrasenia: contrasenia,
        userType: 'user',
      };
    }
  }

  cerrarSesion() {
    this.usuarioActual = null;
  }
}

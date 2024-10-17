import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  nombre: string = '';
  contrasenia: string = '';
  private auth = inject(AuthServiceService);

  login() {
    this.auth.loguear(this.nombre, this.contrasenia);
  }

  usuarioempleado() {
    this.nombre = 'user';
    this.contrasenia = '123456';
  }

  usuarioAdmin() {
    this.nombre = 'admin';
    this.contrasenia = '123456';
  }
}

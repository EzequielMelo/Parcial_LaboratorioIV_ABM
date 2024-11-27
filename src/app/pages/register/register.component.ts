import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  private router = inject(Router);
  private authService = inject(AuthServiceService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe((respuesta) => {
      if (respuesta != null) {
        this.router.navigateByUrl('');
      }
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
        error: (err) => {
          const errorMessage = err?.message || '';
          if (errorMessage.includes('El nombre de usuario ya está en uso')) {
            this.errorMessage =
              'Este nombre de usuario ya está registrado. Por favor, elige otro.';
          } else {
            this.errorMessage =
              errorMessage || 'Hubo un problema al registrar el usuario.';
          }
        },
      });
    }
  }
}

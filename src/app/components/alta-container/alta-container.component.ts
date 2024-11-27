import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-alta-container',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alta-container.component.html',
  styleUrl: './alta-container.component.css',
})
export class AltaContainerComponent {
  @Output() eventoContainer = new EventEmitter<{
    codigo: string;
    capacidad: number;
    empresa: string;
  }>();
  altaContainerForm: FormGroup;
  errorMessage = '';

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.altaContainerForm = this.formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^\d+$/), // Asegura que sean solo números
        ],
      ],
      capacidad: [
        '',
        [
          Validators.required,
          Validators.min(1), // Mayor que 0
        ],
      ],
      empresa: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[a-zA-Z\s]*$/), // Solo letras y espacios
        ],
      ],
    });
  }

  addContainer() {
    if (this.altaContainerForm.valid) {
      const { codigo, capacidad, empresa } = this.altaContainerForm.value;
      this.eventoContainer.emit({ codigo, capacidad, empresa });
      this.altaContainerForm.reset();
    }
  }
}

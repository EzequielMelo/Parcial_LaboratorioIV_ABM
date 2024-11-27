import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-modificacion-container',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modificacion-container.component.html',
  styleUrl: './modificacion-container.component.css',
})
export class ModificacionContainerComponent implements OnChanges {
  @Input() container: any | null = null;
  selectedContainerId: string | null = null;
  modificarContainerForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  private db = inject(DatabaseService);

  constructor() {
    this.modificarContainerForm = this.formBuilder.group({
      codigo: [
        {
          value: '',
          disabled: true,
        },
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container'] && this.container) {
      this.modificarContainerForm.patchValue({
        codigo: this.container.codigo || '',
        capacidad: this.container.capacidad || '',
        empresa: this.container.empresa || '',
      });
      this.selectedContainerId = this.container.id;
    }
  }

  modifyContainer() {
    if (this.modificarContainerForm.valid && this.selectedContainerId) {
      const updatedData = this.modificarContainerForm.value;

      this.db
        .updateContainer(this.selectedContainerId, updatedData)
        .then(() => {
          console.log('Contenedor actualizado con éxito');
        })
        .catch((error) => {
          console.error('Error actualizando el contenedor: ', error);
        });
    }
  }
}

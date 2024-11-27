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
  selector: 'app-baja-container',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './baja-container.component.html',
  styleUrl: './baja-container.component.css',
})
export class BajaContainerComponent implements OnChanges {
  @Input() container: any | null = null;
  selectedContainerId: string | null = null;
  deleteContainerForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  private db = inject(DatabaseService);

  constructor() {
    this.deleteContainerForm = this.formBuilder.group({
      codigo: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
      capacidad: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
      empresa: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container'] && this.container) {
      this.deleteContainerForm.patchValue({
        codigo: this.container.codigo || '',
        capacidad: this.container.capacidad || '',
        empresa: this.container.empresa || '',
      });
      this.selectedContainerId = this.container.id;
    }
  }

  deleteContainer() {
    if (this.selectedContainerId) {
      this.db
        .deleteContainer(this.selectedContainerId)
        .then(() => {
          console.log('Contenedor eliminado con éxito');
        })
        .catch((error) => {
          console.error('Error eliminando el contenedor: ', error);
        });
    }
  }
}

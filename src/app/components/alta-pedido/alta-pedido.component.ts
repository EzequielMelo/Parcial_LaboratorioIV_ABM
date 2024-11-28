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
  selector: 'app-alta-pedido',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alta-pedido.component.html',
  styleUrl: './alta-pedido.component.css',
})
export class AltaPedidoComponent implements OnChanges {
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
      codigoProducto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^\d+$/),
        ],
      ],
      cantidadProducto: [
        '',
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container'] && this.container) {
      this.modificarContainerForm.patchValue({
        codigo: this.container.codigo || '',
      });
      this.selectedContainerId = this.container.id;
    }
  }

  createPedido() {
    const formValues = this.modificarContainerForm.value;
    const container = this.container; // Aquí tienes el contenedor con todos sus datos, incluida la capacidad

    if (!container) {
      alert('Contenedor no seleccionado.');
      return;
    }

    const cantidadProducto = formValues.cantidadProducto;
    const capacidadRestante = container.capacidad - cantidadProducto;

    if (capacidadRestante < 0) {
      alert(
        `El pedido excede la capacidad del contenedor. Capacidad disponible: ${container.capacidad}, cantidad solicitada: ${cantidadProducto}`
      );
      return;
    }

    const updatedContainer = {
      ...container,
      capacidad: capacidadRestante,
    };

    this.db.updateContainerCapacity(container.id, capacidadRestante);

    const pedido = {
      containerId: container.codigo,
      codigoProducto: formValues.codigoProducto,
      cantidad: cantidadProducto,
    };

    this.db
      .addPedido(pedido)
      .then(() => {
        alert('Pedido creado exitosamente.');
      })
      .catch((error) => {
        console.error('Error al crear el pedido:', error);
        alert('No se pudo crear el pedido. Inténtalo de nuevo.');
      });
  }
}

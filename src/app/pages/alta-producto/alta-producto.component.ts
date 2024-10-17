import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TablaPaisesComponent } from '../../components/tabla-paises/tabla-paises.component';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablaPaisesComponent,
  ],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css',
})
export class AltaProductoComponent {
  countries: any[] = [];
  paisProducto: string = '';
  public formGroup: FormGroup;
  fb = inject(FormBuilder);
  db = inject(DatabaseService);
  private apiRequest = inject(ApiRequestService);

  constructor() {
    this.formGroup = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Solo números
      stock: ['', [Validators.required, Validators.min(1)]],
      paisOrigen: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiRequest.getCountries().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.countries = data
            .map((country: any) => ({
              name: country.name.common || 'Nombre no disponible',
              flag: country.flags?.svg || 'URL no disponible',
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
        } else {
          console.error('La respuesta no es un array:', data);
        }
      },
      (error) => {
        console.error('Error al obtener los países:', error);
      }
    );
  }

  altaProducto() {
    if (this.formGroup.valid) {
      // Obtiene los datos del formulario
      const producto = this.formGroup.value;

      // Llama al servicio para agregar el producto a Firebase
      this.db
        .addProducto(producto)
        .then(() => {
          console.log('Producto añadido con éxito');
        })
        .catch((error) => {
          console.error('Error al añadir el producto:', error);
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  recibirPais(paisProducto: string) {
    this.paisProducto = paisProducto;
    console.log(paisProducto);
  }
}

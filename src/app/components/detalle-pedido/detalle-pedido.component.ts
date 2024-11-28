import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database/database.service';
import { ApiRequestService } from '../../services/api-request/api-request.service';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css',
})
export class DetallePedidoComponent implements OnChanges {
  @Input() container: any | null = null;
  pedidos: any[] = [];
  apiRequestService = inject(ApiRequestService);
  countryDetails: any = null;
  error: string | null = null;
  private db = inject(DatabaseService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container'] && this.container) {
      this.obtenerPedidosPorContainer(this.container.codigo);

      if (this.pedidos && Array.isArray(this.pedidos)) {
        this.pedidos.forEach((pedido) => {
          if (pedido.producto && pedido.producto.paisOrigen) {
            this.apiRequestService
              .getCountryByName(pedido.producto.paisOrigen)
              .subscribe({
                next: (data) => {
                  // Asocia los detalles del país al pedido
                  pedido.countryDetails = data[0];
                },
                error: (err) => {
                  console.error(
                    `Error al obtener el país para ${pedido.producto.paisOrigen}:`,
                    err
                  );
                  pedido.countryDetails = null; // Manejo de error
                },
              });
          } else {
            console.warn(
              `El pedido ${pedido.id} no tiene un producto o país de origen válido.`
            );
          }
        });
      }
    }
  }

  obtenerPedidosPorContainer(containerId: string) {
    this.db.getPedidosByContainerId(containerId).subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }
}

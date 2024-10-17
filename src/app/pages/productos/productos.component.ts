import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database/database.service';
import { DetalleProductoComponent } from '../../components/detalle-producto/detalle-producto.component';
import { TablaProductosComponent } from '../../components/tabla-productos/tabla-productos.component';
import { DetallePaisComponent } from '../../components/detalle-pais/detalle-pais.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    DetalleProductoComponent,
    TablaProductosComponent,
    DetallePaisComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productos: any[] = [];
  pais: string = '';
  producto: any | null = null;
  subscription: Subscription | undefined = undefined;
  private db = inject(DatabaseService);

  ngOnInit() {
    const observable = this.db.getproductos();
    this.subscription = observable.subscribe((resultado) => {
      this.productos = resultado;
    });
  }

  recibirDetalleProducto($event: any) {
    this.producto = $event;
    this.pais = this.producto.paisOrigen;
  }
}

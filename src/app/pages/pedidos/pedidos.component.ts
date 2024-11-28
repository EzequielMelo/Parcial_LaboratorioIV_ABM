import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database/database.service';
import { TablaContainersComponent } from '../../components/tabla-containers/tabla-containers.component';
import { AltaPedidoComponent } from '../../components/alta-pedido/alta-pedido.component';
import { DetallePedidoComponent } from '../../components/detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    TablaContainersComponent,
    AltaPedidoComponent,
    DetallePedidoComponent,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  containers: any[] = [];
  container: any | null = null;
  subscription: Subscription | undefined = undefined;
  private db = inject(DatabaseService);

  ngOnInit() {
    const observable = this.db.getContainers();
    this.subscription = observable.subscribe((resultado) => {
      this.containers = resultado;
    });
  }

  recibirDetalleContainer($event: any) {
    this.container = $event;
    console.log(this.container);
  }
}

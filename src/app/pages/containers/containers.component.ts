import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database/database.service';
import { TablaContainersComponent } from '../../components/tabla-containers/tabla-containers.component';
import { AltaContainerComponent } from '../../components/alta-container/alta-container.component';
import { ModificacionContainerComponent } from '../../components/modificacion-container/modificacion-container.component';
import { BajaContainerComponent } from '../../components/baja-container/baja-container.component';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [
    TablaContainersComponent,
    AltaContainerComponent,
    ModificacionContainerComponent,
    BajaContainerComponent,
  ],
  templateUrl: './containers.component.html',
  styleUrl: './containers.component.css',
})
export class ContainersComponent {
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

  onContainerAdded(data: {
    codigo: string;
    capacidad: number;
    empresa: string;
  }) {
    console.log('Datos recibidos:', data);
    this.db.addContainer(data);
  }
}

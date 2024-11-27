import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-containers',
  standalone: true,
  imports: [],
  templateUrl: './tabla-containers.component.html',
  styleUrl: './tabla-containers.component.css',
})
export class TablaContainersComponent {
  @Input() containers: any[] = [];
  @Output() eventoContainer: EventEmitter<any> = new EventEmitter<any>();

  mostrarDetalles(container: any) {
    this.eventoContainer.emit(container);
  }
}

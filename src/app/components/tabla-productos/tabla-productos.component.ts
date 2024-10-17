import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.css',
})
export class TablaProductosComponent {
  @Input() productos: any[] = [];
  @Output() eventoProducto: EventEmitter<any> = new EventEmitter<any>();

  mostrarDetalles(producto: any) {
    this.eventoProducto.emit(producto);
  }
}

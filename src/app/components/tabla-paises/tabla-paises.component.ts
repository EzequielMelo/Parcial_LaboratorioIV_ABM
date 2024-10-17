import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css',
})
export class TablaPaisesComponent {
  @Input() countries: any[] = [];
  @Output() eventoPais: EventEmitter<string> = new EventEmitter<string>(); // Tipo string

  seleccionarPais(pais: string) {
    this.eventoPais.emit(pais);
  }
}

import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css',
})
export class DetallePaisComponent {
  @Input() pais: any | null = null;
  apiRequestService = inject(ApiRequestService);
  countryDetails: any = null;
  error: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pais'] && this.pais) {
      this.apiRequestService.getCountryByName(this.pais).subscribe({
        next: (data) => {
          this.countryDetails = data[0];
          console.log(this.countryDetails);
        },
        error: (err) => {
          console.error('Error al obtener el país:', err);
          this.error = 'No se pudo encontrar el país';
        },
      });
    }
  }
}

import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request/api-request.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
})
export class BienvenidaComponent {
  receivedData: any = {};

  apiRequest = inject(ApiRequestService);

  ngOnInit() {
    const request = this.apiRequest.getUser('EzequielMelo');

    request.subscribe((response) => {
      this.receivedData = response;
      console.log(this.receivedData);
    });
  }
}

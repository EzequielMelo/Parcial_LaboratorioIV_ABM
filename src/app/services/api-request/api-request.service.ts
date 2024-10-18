import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  apiGithubUrl = 'https://api.github.com/users/';
  apiUrl = 'https://restcountries.com/v3.1/all';
  hhtp = inject(HttpClient);
  constructor() {}

  getUser(usuario: string) {
    const petition = this.hhtp.get(this.apiGithubUrl + usuario, {
      responseType: 'json',
      params: {
        ejemplo: 'labo4',
      },
    });

    return petition;
  }

  getCountries() {
    const petition = this.hhtp.get(this.apiUrl, {
      responseType: 'json',
    });

    return petition;
  }

  getCountryByName(pais: string) {
    const apiUrl = `https://restcountries.com/v3.1/name/${pais}`;
    return this.hhtp.get<any[]>(apiUrl, {
      responseType: 'json',
    });
  }
}

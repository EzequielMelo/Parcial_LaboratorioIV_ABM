import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore = inject(AngularFirestore);

  constructor() {}

  getDatos() {
    const datos = this.firestore.collection('datos');
    return datos.valueChanges();
  }

  addProducto(producto: any) {
    const productosColl = this.firestore.collection('productos');
    return productosColl.add(producto);
  }
}

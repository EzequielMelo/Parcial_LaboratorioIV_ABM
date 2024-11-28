import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { firstValueFrom, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore = inject(AngularFirestore);
  private fire = inject(Firestore);

  constructor() {}

  getDatos() {
    const datos = this.firestore.collection('datos');
    return datos.valueChanges();
  }

  addProducto(producto: any) {
    const productosColl = this.firestore.collection('productos');
    return productosColl.add(producto);
  }

  getproductos() {
    const productos = this.firestore.collection('productos');
    return productos.valueChanges();
  }

  existsProductoByCodigo(
    codigo: string,
    callback: (existe: boolean) => void
  ): void {
    this.firestore
      .collection('productos', (ref) => ref.where('codigo', '==', codigo))
      .get()
      .subscribe((querySnapshot) => {
        callback(!querySnapshot.empty);
      });
  }

  getCantidadProducto(codigo: string, callback: (stock: number) => void): void {
    this.firestore
      .collection('productos', (ref) => ref.where('codigo', '==', codigo))
      .get()
      .subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          const producto = querySnapshot.docs[0].data() as { stock: number };
          callback(producto.stock || 0);
        } else {
          callback(0);
        }
      });
  }

  addContainer(container: any) {
    const containersColl = this.firestore.collection('containers');
    return containersColl.add(container);
  }

  getContainers() {
    const containers = this.firestore.collection('containers');
    return containers.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  updateContainerCapacity(containerId: string, nuevaCapacidad: number) {
    const containerRef = this.firestore
      .collection('containers')
      .doc(containerId);
    return containerRef
      .update({ capacidad: nuevaCapacidad })
      .then(() => {
        console.log('Capacidad del contenedor actualizada correctamente.');
      })
      .catch((error) => {
        console.error(
          'Error al actualizar la capacidad del contenedor:',
          error
        );
      });
  }

  addPedido(pedido: any) {
    const containersColl = this.firestore.collection('pedido');
    return containersColl.add(pedido);
  }

  getPedidosByContainerId(containerId: string) {
    const pedidosColl = this.firestore.collection('pedido', (ref) =>
      ref.where('containerId', '==', containerId)
    );

    return pedidosColl.get().pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any), // Casting a `any` para manejar datos dinámicos
        }));
      }),
      switchMap((pedidos) => {
        const pedidosConProducto = pedidos.map(async (pedido) => {
          const productoSnapshot = await this.firestore
            .collection('productos', (ref) =>
              ref.where('codigo', '==', pedido.codigoProducto)
            )
            .get()
            .toPromise();

          // Asegúrate de manejar el caso donde `productoSnapshot` sea undefined o no tenga datos
          if (!productoSnapshot || productoSnapshot.empty) {
            return {
              ...pedido,
              producto: null, // Si no hay producto, lo asignamos como null
            };
          }

          const producto = productoSnapshot.docs[0].data(); // Toma el primer documento coincidente
          return {
            ...pedido,
            producto,
          };
        });

        return Promise.all(pedidosConProducto); // Resuelve todas las Promises
      })
    );
  }

  updateContainer(containerId: string, updatedData: any) {
    const containerDoc = this.firestore
      .collection('containers')
      .doc(containerId);
    return containerDoc.update(updatedData);
  }

  deleteContainer(containerId: string) {
    const containerDoc = this.firestore
      .collection('containers')
      .doc(containerId);
    return containerDoc.delete();
  }

  addUsers(user: any, colID: string) {
    const userDocRef = doc(this.fire, `users/${colID}`);
    setDoc(userDocRef, user);
  }

  getUser() {
    const usersColl = this.firestore.collection('users');
    usersColl.get;
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.firestore
      .collection('users', (ref) => ref.where('userName', '==', username))
      .get()
      .pipe(map((snapshot) => !snapshot.empty));
  }

  getUserData(uid: string): Observable<any | null> {
    const userDocRef = doc(this.fire, `users/${uid}`);
    return from(
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        }
        return null;
      })
    );
  }
}

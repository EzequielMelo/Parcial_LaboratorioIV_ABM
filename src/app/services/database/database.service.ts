import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

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
          return { id, ...data }; // Incluye el ID en el objeto
        })
      )
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

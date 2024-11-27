import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
  UserCredential,
} from '@angular/fire/auth';
import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private authUserSubject = new BehaviorSubject<any | null>(null);
  public authUser$ = this.authUserSubject.asObservable();
  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable();
  authSubscription?: Unsubscribe;

  private auth = inject(Auth);
  private errorHandler = inject(ErrorHandlerService);
  private db = inject(DatabaseService);

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.authUserSubject.next(authUser);
        this.loadUserData(authUser.uid);
      } else {
        this.authUserSubject.next(null);
        this.userSubject.next(null);
      }
    });
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      // No necesitas obtener los datos del usuario aquí
      catchError((error) => {
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    return this.db.checkUsernameExists(username).pipe(
      switchMap((exists) => {
        if (exists) {
          return throwError(() => ({
            message: 'El nombre de usuario ya está en uso.',
          }));
        }
        return from(
          createUserWithEmailAndPassword(this.auth, email, password).then(
            (userCredential) => {
              const uid = userCredential.user.uid;
              const user: any = {
                userName: username,
                userType: 'user',
              };
              return this.db.addUsers(user, uid);
            }
          )
        );
      }),
      catchError((error) => {
        const errorMessage = this.errorHandler.handleAuthError(error);
        return throwError(() => ({ message: errorMessage }));
      })
    );
  }

  private loadUserData(uid: string): void {
    this.db.getUserData(uid).subscribe((userData) => {
      if (userData) {
        this.userSubject.next(userData); // Actualiza los datos completos del usuario
      }
    });
  }

  logOut() {
    this.auth.signOut();
  }
}

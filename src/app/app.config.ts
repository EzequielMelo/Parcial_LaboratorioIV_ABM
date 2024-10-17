import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'primer-parcial-laboiv-melo',
        appId: '1:929372550212:web:43e33a63066de87707b811',
        storageBucket: 'primer-parcial-laboiv-melo.appspot.com',
        apiKey: 'AIzaSyCeOV4k-d4PX6i4jg6QJ57_fH2uo5Oqfd4',
        authDomain: 'primer-parcial-laboiv-melo.firebaseapp.com',
        messagingSenderId: '929372550212',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'primer-parcial-laboiv-melo',
        appId: '1:929372550212:web:43e33a63066de87707b811',
        storageBucket: 'primer-parcial-laboiv-melo.appspot.com',
        apiKey: 'AIzaSyCeOV4k-d4PX6i4jg6QJ57_fH2uo5Oqfd4',
        authDomain: 'primer-parcial-laboiv-melo.firebaseapp.com',
        messagingSenderId: '929372550212',
      },
    },
    provideHttpClient(withFetch()),
  ],
};

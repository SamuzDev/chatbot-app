import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    }), provideFirebaseApp(() => initializeApp({"projectId":"samuz-gpt","appId":"1:278175786655:web:f3985918f3adc13955a4aa","storageBucket":"samuz-gpt.appspot.com","apiKey":"AIzaSyB6UTOHTPBoSzKjLmcvdnbveeCM7bpa-fU","authDomain":"samuz-gpt.firebaseapp.com","messagingSenderId":"278175786655","measurementId":"G-E3Q5M2N54Y"})), provideAuth(() => getAuth()), provideAnimationsAsync(),
  ]
};



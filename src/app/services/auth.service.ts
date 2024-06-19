import { Injectable, inject } from '@angular/core';
import { Auth, GithubAuthProvider, GoogleAuthProvider, User, authState, signInAnonymously, signInWithPopup } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map de RxJS

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  readonly authState$ = authState(this.auth).pipe(
    map(authState => authState || null)
  );

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  getCurrentUser(): Observable<User | null> {
    return this.authState$;
  }
  
  logout() {
    return this.auth.signOut();
  }

  loginWithGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }

  loginAnonymously() {
    return signInAnonymously(this.auth);
  }
}

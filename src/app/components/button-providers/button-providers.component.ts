import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-button-providers',
  templateUrl: './button-providers.component.html',
  styleUrls: ['./button-providers.component.scss'],
})
export class ButtonProviders {
  private authService = inject(AuthService);
  private router = inject(Router);

  async signInWithGoogle() {
    await this.authService.loginWithGoogle()
    .then((res) => {
      console.log(res.user);
      this.router.navigate(["/chat"]);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  async signInWithGithub() {
    await this.authService.loginWithGithub()
    .then((res) => {
      console.log(res.user);
      this.router.navigate(["/chat"]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async signInAnonymously() {
    await this.authService.loginAnonymously()
   .then((userCredential) => {
      console.log('User signed in anonymously', userCredential.user);
      this.router.navigate(['/chat']);
    })
   .catch((error) => {
      console.error('Error signing in anonymously', error);
    });
  }
}

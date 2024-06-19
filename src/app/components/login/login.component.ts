import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonProviders } from '../button-providers/button-providers.component';

const MODULES = [
  ReactiveFormsModule,
  ButtonProviders
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MODULES ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  toastr = inject(ToastrService);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]*$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });
  
  onSubmit() {
    // if (this.loginForm.valid) {
    //   const username = this.loginForm.get('username')?.value;
    //   const password = this.loginForm.get('password')?.value;

    //   const foundUser = this.usersFromLocalStorage.find((user: any) => 
    //     user.username === username && user.password === password
    //   );

    //   if (foundUser) {
    //     console.log('Inicio de sesión exitoso');
        
    //     localStorage.setItem('isLoggedIn', 'true');
        
    //     this.toastr.success('Inicio de sesión exitoso', '¡Bienvenido!');

    //     this.router.navigate(["/home"]);
    //   } else {
    //     this.toastr.error('Usuario o contraseña incorrectos', '¡Error!');
    //   }
    // }
  }


}

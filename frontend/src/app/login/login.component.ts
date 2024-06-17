// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Importez le service Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { } // Injectez le service Router

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(response => {
        if (response.success) {
          // Handle successful login
          console.log('Login successful. Token:', response.token);
          // Rediriger vers la page de profil après un login réussi
          this.router.navigate(['/profile']);
        } else {
          // Handle failed login
          console.error('Login failed. Message:', response.message);
        }
      });
  }
}
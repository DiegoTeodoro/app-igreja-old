import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../models/login-response.model'; // Ajuste o caminho conforme necessário
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  
  onLogin() {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe({
      next: response => {
        this.snackBar.open('Acesso Liberado', 'Fechar', { duration: 3000 });
      },
      error: error => {
        this.snackBar.open('Login ou senha incorretos', 'Fechar', { duration: 3000 });
      }
    });
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component'; // Importar AppComponent para notificar o login bem-sucedido

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent // Injetar AppComponent
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { login, senha } = this.loginForm.value;
      this.authService.login(login, senha).subscribe({
        next: (response) => {
          if (response.valid) {
            this.appComponent.onLoginSuccess(); // Chama a função para atualizar o estado de login
          } else {
            this.errorMessage = 'Login ou senha inválidos';
          }
        },
        error: (error) => {
          this.errorMessage = 'Erro ao tentar fazer login';
        }
      });
    }
  }
}

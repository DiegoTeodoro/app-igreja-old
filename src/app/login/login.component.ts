import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component'; // Importar AppComponent para chamar login sucesso

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
    private appComponent: AppComponent // Injeta AppComponent para acessar o estado de login
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  // Submissão do formulário de login
  onSubmit() {
    if (this.loginForm.valid) {
      const { login, senha } = this.loginForm.value;
      this.authService.login(login, senha).subscribe({
        next: (response) => {
          if (response.valid) {
            this.appComponent.onLoginSuccess(); // Chama função para login bem-sucedido
          } else {
            this.errorMessage = 'Login ou senha inválidos';
          }
        },
        error: () => {
          this.errorMessage = 'Erro ao tentar fazer login';
        }
      });
    }
  }
}

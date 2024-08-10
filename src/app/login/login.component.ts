import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
    // Adicione aqui os usuários que você possui no sistema
  ];

  constructor(private router: Router) {}

  onLogin() {
    const user = this.users.find(u => u.username === this.loginData.username && u.password === this.loginData.password);
    if (user) {
      // Login bem-sucedido, redirecione para a página inicial
      this.router.navigate(['/home']);
    } else {
      // Exibir mensagem de erro
      alert('Credenciais inválidas');
    }
  }
}

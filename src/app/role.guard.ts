import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/auth.service'; // Importe o AuthService

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole(); // Obtém o papel do usuário
    if (userRole === 'admin') {
      return true; // Se for admin, permite o acesso
    } else {
      this.router.navigate(['/home']); // Redireciona para home se não for admin
      return false;
    }
  }
}

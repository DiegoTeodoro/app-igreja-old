import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../app/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this.usuarioService.isAuthenticated()) {
      return true;
    } else {
      // Redirecionar para a página de login se o usuário não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}

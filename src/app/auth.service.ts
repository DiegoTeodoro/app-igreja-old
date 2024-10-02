import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../app/models/login-response.model'; // Importe a interface de resposta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { login, senha }).pipe(
      tap((response: LoginResponse) => {
        if (response.valid) {
          // Salva o estado de autenticação no localStorage
          localStorage.setItem('isAuthenticated', 'true');
        }
      })
    );
  }

  isAuthenticated(): boolean {
    // Verifica se o estado de autenticação está no localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    // Limpa o localStorage no logout
    localStorage.removeItem('isAuthenticated');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../app/models/LoginResponse'; // Importe a interface de resposta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Ajuste conforme o endereço da sua API

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { login, senha }).pipe(
      tap((response: LoginResponse) => {
        if (response.valid) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', response.role); // Salva o role no localStorage
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  }
}

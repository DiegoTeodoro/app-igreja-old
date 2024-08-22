// src/app/services/usuario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../app/models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   
    private apiUrl = 'http://localhost:3000/usuario';
  
    constructor(private http: HttpClient) {}
  
    // Criar um novo usuário
    createUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.apiUrl, usuario);
    }
  
    // Obter todos os usuários
    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }
  
    // Obter um usuário por ID
    getUsuarioById(id: number): Observable<Usuario> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Usuario>(url);
    }
  
    // Atualizar um usuário
    updateUsuario(usuario: Usuario): Observable<void> {
      const url = `${this.apiUrl}/${usuario.id}`;
      return this.http.put<void>(url, usuario);
    }
  
    // Deletar um usuário
    deleteUsuario(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }

    validateLogin(login: string, senha: string): Observable<Usuario | null> {
      return this.http.post<Usuario>(`${this.apiUrl}/login`, { login, senha });
    }
    // src/app/services/usuario.service.ts

isAuthenticated(): boolean {
  // Aqui você pode implementar a lógica para verificar se o usuário está autenticado.
  // Isso pode ser feito verificando se existe um token de autenticação salvo no localStorage
  // ou qualquer outra lógica de autenticação que você esteja utilizando.
  return !!localStorage.getItem('authToken');
}

  }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../app/models/usuario'; // Certifique-se de que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://seu-endereco-api.com/usuarios'; // Substitua pelo URL da sua API

  constructor(private http: HttpClient) { }

  // Método para criar um novo usuário
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario);
  }

  // Método para obter todos os usuários
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  // Método para obter um usuário por ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Método para atualizar um usuário
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  // Método para deletar um usuário
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

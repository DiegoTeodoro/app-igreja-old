import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000'; // A URL base do seu servidor

  constructor(private http: HttpClient) {}

  // Método para obter todos os estados
  getEstados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estados`);
  }

  // Método para obter as cidades com base no estado selecionado
  getCidadesByEstado(estadoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cidades?estado_id=${estadoId}`);
  }

  // Outros métodos para operações CRUD de empresa
  getEmpresa(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas/${id}`);
  }

  createEmpresa(empresa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresas`, empresa);
  }

  updateEmpresa(id: number, empresa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empresas/${id}`, empresa);
  }
}

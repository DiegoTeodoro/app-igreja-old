import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/fornecedores';  // Altere para sua URL

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fornecedores`);
  }

  addFornecedor(fornecedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fornecedores`, fornecedor);
  }

  updateFornecedor(id: number, fornecedor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/fornecedores/${id}`, fornecedor);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fornecedores/${id}`);
  }
}

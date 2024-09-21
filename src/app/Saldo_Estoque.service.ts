import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaldoEstoqueService {
  private apiUrl = 'http://localhost:3000/saldo-estoque';  // URL da API de saldo de estoque
  baseUrl: any;

  constructor(private http: HttpClient) {}

  // Método para buscar o preço unitário baseado no produto_id
  getPrecoUnitario(produtoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/preco/${produtoId}`);
  }
  
  // Método para buscar todo o saldo de estoque
  getSaldoEstoque(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data) => console.log('Dados recebidos do servidor:', data))
    );
  }
}
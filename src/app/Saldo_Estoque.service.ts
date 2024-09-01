import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaldoEstoqueService {
  private apiUrl = 'http://localhost:3000/saldo-estoque';  // URL da API de saldo de estoque

  constructor(private http: HttpClient) {}

  // Método para buscar o preço unitário baseado no produto_id
  getPrecoUnitario(produtoId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/saldo-estoque/preco/${produtoId}`);
  }
  
}

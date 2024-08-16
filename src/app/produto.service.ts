import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './models/produto';
import { Categoria } from './models/categoria';
import { Fornecedor } from './models/fornecedores';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:3000/categorias');
  }
  
  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>('http://localhost:3000/fornecedores');
  }
  
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  createProduto(produto: Produto): Observable<any> {
    return this.http.post('http://localhost:3000/produtos', produto, { responseType: 'text' });
  }
  

  updateProduto(id: number, produto: Produto): Observable<any> {
    return this.http.put(`http://localhost:3000/produtos/${id}`, produto, { responseType: 'text' });
  }
  

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/produtos/${id}`, { responseType: 'text' });
  }
  
}


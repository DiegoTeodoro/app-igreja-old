// src/app/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
 
  private apiUrlIgrejas = 'http://localhost:3000/igrejas';  // URL da API de igrejas
  private apiUrlProdutos = 'http://localhost:3000/produtos';  // URL da API de produtos
  apiUrlPedidos: any;

  constructor(private http: HttpClient) {}

  getIgrejas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlIgrejas);
  }

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProdutos);
  }
  
// Método para buscar todos os pedidos
getPedidos(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/pedidos');
}

  // Método para registrar o pedido e os itens do pedido
  registrarPedido(pedido: any): Observable<any> {
    return this.http.post('http://localhost:3000/pedidos', pedido);
  }

  // Método para buscar um pedido pelo código
  getPedidoPorCodigo(codigoPedido: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPedidos}/${codigoPedido}`);
  }

 
  
}

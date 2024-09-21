// pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, PedidoItem } from './models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos';
  private apiUrlItens = 'http://localhost:3000/pedido-itens';

  constructor(private http: HttpClient) {}

  // Retorna todos os pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Retorna um pedido por ID
  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  // Cria um novo pedido
  createPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  // Atualiza um pedido existente
  updatePedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }

  // Exclui um pedido
  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Adiciona itens ao pedido
  createPedidoItem(pedidoItem: PedidoItem): Observable<any> {
    return this.http.post(this.apiUrlItens, pedidoItem);
  }

  // Atualiza um item de pedido
  updatePedidoItem(id: number, pedidoItem: PedidoItem): Observable<any> {
    return this.http.put(`${this.apiUrlItens}/${id}`, pedidoItem);
  }

  // Remove um item de pedido
  deletePedidoItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlItens}/${id}`);
  }
}

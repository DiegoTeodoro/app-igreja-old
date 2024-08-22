import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemNotaFiscal } from '../app/models/itens-nota-fiscal'; // Importando as interfaces

@Injectable({
    providedIn: 'root'
  })
  export class ItensNotaFiscalService {
    private apiUrl = 'http://localhost:3000/itens-nota-fiscal';
  
    constructor(private http: HttpClient) {}
  
    getItensNotaFiscal(notaFiscalId: number): Observable<ItemNotaFiscal[]> {
      return this.http.get<ItemNotaFiscal[]>(`${this.apiUrl}/nota-fiscal/${notaFiscalId}`);
    }
  
    addItemNotaFiscal(itemNotaFiscal: ItemNotaFiscal): Observable<ItemNotaFiscal> {
      return this.http.post<ItemNotaFiscal>(this.apiUrl, itemNotaFiscal);
    }
  
    updateItemNotaFiscal(id: number, itemNotaFiscal: ItemNotaFiscal): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, itemNotaFiscal);
    }
  
    deleteItemNotaFiscal(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  }

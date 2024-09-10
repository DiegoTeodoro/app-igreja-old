import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaFiscal } from '../app/models/nota-fiscal';
import { ItemNotaFiscal } from '../app/models/itens-nota-fiscal';


@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {
  private apiUrl = 'http://localhost:3000/notas-fiscais';  // URL do seu backend

  constructor(private http: HttpClient) {}

  salvarNotaFiscal(notaFiscal: NotaFiscal, itens: ItemNotaFiscal[]): Observable<any> {
    return this.http.post(this.apiUrl, { notaFiscal, itens });
  }
}

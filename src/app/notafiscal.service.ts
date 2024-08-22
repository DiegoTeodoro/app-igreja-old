import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaFiscal} from '../app/models/nota-fiscal'; // Importando as interfaces

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {
  private apiUrl = 'http://localhost:3000/notas-fiscais';

  constructor(private http: HttpClient) {}

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.apiUrl);
  }

  getNotaFiscal(id: number): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.apiUrl}/${id}`);
  }

  addNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.apiUrl, notaFiscal);
  }

  updateNotaFiscal(id: number, notaFiscal: NotaFiscal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, notaFiscal);
  }

  deleteNotaFiscal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

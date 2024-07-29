import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/estados';  // Altere para sua URL

  constructor(private http: HttpClient) {}

  // Estados
  getEstados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estados`);
  }

  addEstado(estado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/estados`, estado);
  }

  updateEstado(id: number, estado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/estados/${id}`, estado);
  }

  deleteEstado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/estados/${id}`);
  }
}
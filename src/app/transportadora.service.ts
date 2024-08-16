import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportadora } from '../app/models/transportadora';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {
  private baseUrl = 'http://localhost:3000/transportadora';

  constructor(private http: HttpClient) {}

  getTransportadoras(): Observable<Transportadora[]> {
    return this.http.get<Transportadora[]>(`${this.baseUrl}`);
  }

  getTransportadoraById(id: number): Observable<Transportadora> {
    return this.http.get<Transportadora>(`${this.baseUrl}/${id}`);
  }

  createTransportadora(transportadora: Transportadora): Observable<Transportadora> {
    return this.http.post<Transportadora>(`${this.baseUrl}`, transportadora);
  }

  updateTransportadora(id: number, transportadora: Transportadora): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, transportadora);
  }

  deleteTransportadora(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

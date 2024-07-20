import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {
  private apiUrl = 'http://localhost:3000/igrejas';

  constructor(private http: HttpClient) {}

  getIgrejas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createIgreja(igreja: any): Observable<any> {
    return this.http.post(this.apiUrl, igreja);
  }
  addIgreja(igreja: any): Observable<any> {
    return this.http.post(this.apiUrl, igreja);
  }

  updateIgreja(id: number, igreja: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, igreja);
  }

  deleteIgreja(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

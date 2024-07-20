import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private apiUrl = 'http://localhost:3000/setores';

  constructor(private http: HttpClient) {}
  
  createSetor(setor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/setor`, setor);
  }
  getSetores(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addSetor(setor: any): Observable<any> {
    return this.http.post(this.apiUrl, setor);
  }

  updateSetor(id: number, setor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, setor);
  }

  deleteSetor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

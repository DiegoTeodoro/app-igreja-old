import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.isAuthenticated.next(true);
          this.router.navigate(['/home']);
        } else {
          this.isAuthenticated.next(false);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}

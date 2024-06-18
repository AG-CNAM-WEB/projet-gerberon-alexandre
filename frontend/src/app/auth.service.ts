import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.token);
        }
      })
    );
  }

  register(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, userDetails).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}user/profile`, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

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
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  register(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, userDetails).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}user/profile`, { headers });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}

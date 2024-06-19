// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(environment.backendAuth.login, { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  register(userDetails: any): Observable<any> {
    return this.http.post<any>(environment.backendAuth.register, userDetails).pipe(
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
    return this.http.get(environment.backendProfile.profile, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(environment.backendProfile.updateProfile, profileData, { headers });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}

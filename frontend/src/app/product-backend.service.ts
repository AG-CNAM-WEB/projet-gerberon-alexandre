import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBackendService {
  private productsUrl = 'http://localhost:3000/api/'; // Endpoint de l'API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.productsUrl}products`);
  }

  searchProducts(query: string): Observable<any> {
    let params = new HttpParams().set('q', query);
    return this.http.get(`${this.productsUrl}/search`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductBackendService {
  //private productsUrl = 'http://localhost:3000/api/'; // Endpoint de l'API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(environment.backendProducts.products);
  }

  searchProducts(query: string): Observable<any> {
    let params = new HttpParams().set('q', query);
    return this.http.get(environment.backendProducts.search, { params });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductBackendService } from './product-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productBackendService: ProductBackendService) {}

  getProducts(): Observable<any> {
    return this.productBackendService.getProducts();
  }
}

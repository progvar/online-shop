import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'any'
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getAllProducts(): Observable<Product[]> {
    return this.apiService.getAllProducts();
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.apiService.getRecommendedProducts();
  }
}
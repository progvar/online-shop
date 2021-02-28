import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
    providedIn: 'any'
})
export class ProductService {
  private allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);
  private recommendedProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);

  isDataLoading$: Observable<boolean> = this.apiService.getLoadingState();

  constructor(private apiService: ApiService) {
    this.apiService
      .getAllProducts()
      .subscribe(allProducts => this.allProducts$.next(allProducts));

    this.apiService
      .getRecommendedProducts()
      .subscribe(recommendedProducts => this.recommendedProducts$.next(recommendedProducts));
  }

  getAllProducts(): Observable<Product[]> {
    return this.allProducts$.asObservable();
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.recommendedProducts$.asObservable();
  }
}
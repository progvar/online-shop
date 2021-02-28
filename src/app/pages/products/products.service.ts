import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
    providedIn: 'any'
})
export class ProductsService {
  private recommendedProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);

  isDataLoading$: Observable<boolean> = this.apiService.getLoadingState();

  constructor(private apiService: ApiService) {
    this.apiService
      .getRecommendedProducts()
      .subscribe(recommendedProducts => this.recommendedProducts$.next(recommendedProducts));
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.recommendedProducts$.asObservable();
  }
}
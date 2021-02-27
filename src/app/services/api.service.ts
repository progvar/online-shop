import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true as boolean);

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8080/products');
  }

  getRecommendedProducts(): Observable<Product[]> {
    this.isLoading$.next(true);

    return this.http.get<Product[]>('http://localhost:8080/recommendeds').pipe(tap(() => this.isLoading$.next(false)));
  }

  getLoadingState() {
    return this.isLoading$.asObservable();
  }
}
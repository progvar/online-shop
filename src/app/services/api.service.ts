import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8080/products').pipe(tap(console.log));
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/recommendeds').pipe(tap(console.log));
  }
}
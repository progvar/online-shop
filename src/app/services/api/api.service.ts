import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Product } from '../../models/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true as boolean);

  constructor(private http: HttpClient) {}

  getRecommendedProducts(): Observable<Product[]> {
    this.isLoading$.next(true);

    return this.http.get<Product[]>('http://localhost:8080/recommendeds')
      .pipe(
        catchError(this.handleError),
        tap(() => this.isLoading$.next(false)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(error);
  }

  getLoadingState() {
    return this.isLoading$.asObservable();
  }
}
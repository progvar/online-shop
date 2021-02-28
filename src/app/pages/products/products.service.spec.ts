import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { TestScheduler } from  'rxjs/testing'
import { ApiService } from 'src/app/services/api/api.service';
import { Product } from 'src/app/models/models';
import { ProductsService } from './products.service';

describe('ProductService', () => {
    let testScheduler: TestScheduler;
    let productsService: ProductsService;
    let isLoading$: BehaviorSubject<boolean>;
    let recommendedProducts$: BehaviorSubject<Product[]>;
    let mockApiService: {
        getLoadingState: () => Observable<boolean>;
        getRecommendedProducts: () => Observable<Product[]>;
    };

    beforeEach(() => {
        isLoading$ = new BehaviorSubject(true as boolean);
        recommendedProducts$ = new BehaviorSubject([] as Product[]);
        mockApiService = {
            getLoadingState: () => isLoading$.asObservable(),
            getRecommendedProducts: () => recommendedProducts$.asObservable()
        };

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
          });

        TestBed.configureTestingModule({
            providers: [
                ProductsService,
                { provide: ApiService, useValue: mockApiService },
            ]
        });

        productsService = TestBed.inject(ProductsService);
    });

    it('should create', () => {
        expect(productsService).toBeDefined();
    });

    it('should get the loading state from the ApiService', () => testScheduler.run(({ expectObservable }) => {
        const loadingStateChanges$ = new ReplaySubject<boolean>();

        productsService.isDataLoading$.subscribe(loadingStateChanges$)

        isLoading$.next(false);

        expectObservable(loadingStateChanges$).toBe('(ab)', { a: true, b: false });
    }));

    it('should emit the latest recommended products', (done: DoneFn) => {
        const expectedProducts = [{
            id: 0,
            name: 'test',
            description: 'test',
            defaultImage: 'test',
            images: [],
            price: 10,
            discount: 1,
        }];
        
        recommendedProducts$.next(expectedProducts);

        productsService.getRecommendedProducts()
            .subscribe(recommendedProducts => {
                expect(recommendedProducts).toEqual(expectedProducts);
                done();
            });

    })
  });
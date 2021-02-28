import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { TestScheduler } from  'rxjs/testing'
import { ApiService } from 'src/app/services/api/api.service';
import { Product } from 'src/app/models/models';
import { ProductService } from './products.service';

describe('ProductsService', () => {
    let testScheduler: TestScheduler;
    let productService: ProductService;
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
                ProductService,
                { provide: ApiService, useValue: mockApiService },
            ]
        });

        productService = TestBed.inject(ProductService);
    });

    it('should create', () => {
        expect(productService).toBeDefined();
    });

    it('should get the loading state from the ApiService', () => testScheduler.run(({ expectObservable }) => {
        const loadingStateChanges$ = new ReplaySubject<boolean>();

        productService.isDataLoading$.subscribe(loadingStateChanges$)

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

        productService.getRecommendedProducts()
            .subscribe(recommendedProducts => {
                expect(recommendedProducts).toEqual(expectedProducts);
                done();
            });

    })
  });
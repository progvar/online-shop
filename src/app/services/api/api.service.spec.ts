import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from "./api.service";
import { Product } from 'src/app/models/models';
import { TestScheduler } from  'rxjs/testing'
import { ReplaySubject } from 'rxjs';

describe('ApiService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let apiService: ApiService;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
          });

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                ApiService,
              ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        apiService = TestBed.inject(ApiService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('getRecommendedProducts()', () => {
        let expectedProducts: Product[];
        
        it('should return the recommended products while updating the loading state',
            () => testScheduler.run(({ expectObservable }) => {
                expectedProducts = [{
                    id: 0,
                    name: 'test',
                    description: 'test',
                    defaultImage: 'test',
                    images: [],
                    price: 10,
                    discount: 1,
                }];

                const loadingStateChanges$ = new ReplaySubject<boolean>();

                apiService.getRecommendedProducts().subscribe(products => expect(products).toEqual(expectedProducts));

                apiService.getLoadingState().subscribe(loadingStateChanges$)

                const req = httpTestingController.expectOne('http://localhost:8080/recommendeds');

                expect(req.request.method).toEqual('GET');

                req.flush(expectedProducts);

                expectObservable(loadingStateChanges$).toBe('(ab)', { a: true, b: false });
            })
        );

        it('should handle http errors while fetching the recommended products',
            () => testScheduler.run(({ expectObservable }) => {
                expectedProducts = [{
                    id: 0,
                    name: 'test',
                    description: 'test',
                    defaultImage: 'test',
                    images: [],
                    price: 10,
                    discount: 1,
                }];

                const emsg = 'deliberate 404 error';
                const loadingStateChanges$ = new ReplaySubject<boolean>();

                apiService.getRecommendedProducts().subscribe(
                    () => fail('should have failed with the 404 error'),
                    (error: HttpErrorResponse) => {
                        expect(error.status).toEqual(404, 'status');
                        expect(error.error).toEqual(emsg, 'message');
                    }
                );

                apiService.getLoadingState().subscribe(loadingStateChanges$)

                const req = httpTestingController.expectOne('http://localhost:8080/recommendeds');

                expect(req.request.method).toEqual('GET');

                req.flush(emsg, { status: 404, statusText: 'Not Found' });

                expectObservable(loadingStateChanges$).toBe('(a)', { a: true});
            })
        );

    });
  });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductToAdd } from 'src/app/models/models';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let isLoading$: BehaviorSubject<boolean>;
  let recommendedProducts$: BehaviorSubject<Product[]>;
  let mockProductsService:{
    isDataLoading$: BehaviorSubject<boolean>;
    getRecommendedProducts: () => Observable<Product[]>;
  }
  let mockShoppingCartService: {
    addToCart: jasmine.Spy<jasmine.Func>;
  }

  beforeEach(async () => {
    isLoading$ = new BehaviorSubject(true as boolean);
    recommendedProducts$ = new BehaviorSubject([] as Product[]);
    mockProductsService = {
      isDataLoading$: isLoading$,
      getRecommendedProducts: () => recommendedProducts$.asObservable()
    }
    mockShoppingCartService = {
      addToCart: jasmine.createSpy()
    }

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ShoppingCartService, useValue: mockShoppingCartService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the progress bar during data fetching', () => {
    isLoading$.next(true);

    fixture.detectChanges();

    const mdProgressBar = fixture.debugElement.query(By.css('mat-progress-bar'));

    expect(mdProgressBar).not.toBeNull();
  });

  it('should NOT render the progress bar if the data is already available', () => {
    isLoading$.next(false);

    fixture.detectChanges();

    const mdProgressBar = fixture.debugElement.query(By.css('mat-progress-bar'));

    expect(mdProgressBar).toBeNull();
  });

  it('should render an md-card component for every recommended product', () => {
    const expectedProducts = [{
        id: 0,
        name: 'test',
        description: 'test',
        defaultImage: 'test',
        images: [],
        price: 10,
        discount: 1,
      },
      {
        id: 0,
        name: 'test',
        description: 'test',
        defaultImage: 'test',
        images: [],
        price: 10,
        discount: 1,
      }
    ];

    recommendedProducts$.next(expectedProducts);

    fixture.detectChanges();

    const mdCardList = fixture.debugElement.queryAll(By.css('mat-card'));

    expect(mdCardList.length).toBe(2)
  });

  it('should add the product by clicking on the Add to Cart button', () => {
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

    fixture.detectChanges()

    const mockProduct: ProductToAdd = {
      id: 0,
      name: 'test'
    }
    const addToCartBtn = fixture.debugElement.query(By.css('mat-card-actions button'));

    addToCartBtn.triggerEventHandler('click', mockProduct);

    expect(mockShoppingCartService.addToCart).toHaveBeenCalledWith(mockProduct);
  })
});

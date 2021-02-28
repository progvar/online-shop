import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let testSubject: BehaviorSubject<any>;
  
  beforeEach(async () => {
    testSubject = new BehaviorSubject(new Map());

    class MockShoppingService {
      getCartContent = () => testSubject.asObservable();
    }

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ShoppingCartService, useClass: MockShoppingService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should receive 0 for the number of products in the cart', (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    app.productsInCart$.subscribe(numberOfProducts => {
      expect(numberOfProducts).toEqual(0);
      done();
    });
  });

  it('should receive 2 for the number of products in the cart', (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    testSubject.next(new Map().set(1, 'test').set(2, 'test2'))
    fixture.detectChanges();

    app.productsInCart$.subscribe(numberOfProducts => {
      expect(numberOfProducts).toEqual(2);
      done();
    });
  });
});

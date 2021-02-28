import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/app/models/models';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let cartContent$: BehaviorSubject<Map<number, CartItem>>;
  let mockShoppingCartService: {
    getCartContent: () => Observable<Map<number, CartItem>>;
    removeFromCart: jasmine.Spy<jasmine.Func>;
  }

  beforeEach(async () => {
    cartContent$ = new BehaviorSubject(new Map() as Map<number,CartItem>);
    mockShoppingCartService = {
      getCartContent: () => cartContent$.asObservable(),
      removeFromCart: jasmine.createSpy()
    }

    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      providers: [
        { provide: ShoppingCartService, useValue: mockShoppingCartService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the empty cart message if there is no product in the cart', () => {
    const cartContent: Map<number, CartItem> =  new Map();

    cartContent$.next(cartContent);

    fixture.detectChanges();

    const mdCardList = fixture.debugElement.queryAll(By.css('mat-card'));
    const emptyCartText = fixture.debugElement.query(By.css('.empty-cart-message'));

    expect(mdCardList.length).toBe(0);
    expect(emptyCartText).not.toBeNull()
    expect(emptyCartText.nativeElement.innerHTML).toEqual('Your cart is empty...');
  });

  it('should render an md-card component for every product in the cart', () => {
    const cartContent: Map<number, CartItem> =
      new Map().set(0, { name: 'test1', amount: 1}).set(1, { name: 'test2', amount: 1})

    cartContent$.next(cartContent);

    fixture.detectChanges();

    const mdCardList = fixture.debugElement.queryAll(By.css('mat-card'));

    expect(mdCardList.length).toBe(2)
  });

  it('should remove the product by clicking on the Remove from Cart button', () => {
    const cartContent: Map<number, CartItem> = new Map().set(0, { name: 'test1', amount: 1});

    cartContent$.next(cartContent);

    fixture.detectChanges()

    const mockProductToRemove = 0;
    const addToCartBtn = fixture.debugElement.query(By.css('mat-card-actions button'));

    addToCartBtn.triggerEventHandler('click', mockProductToRemove);

    expect(mockShoppingCartService.removeFromCart).toHaveBeenCalledWith(mockProductToRemove);
  });
});

import { ShoppingCartService } from "./shopping-cart.service";

describe('ShoppingCartService', () => {
    let shoppingCartService: ShoppingCartService;

    beforeEach(() => { 
        shoppingCartService = new ShoppingCartService();
    });

    describe('addToCart()', () => {
        it('should return the update cart Map', (done: DoneFn) => {
            const testProduct = { id: 0, name: 'test' };
            const updatedCartItems = new Map().set(0, { name: 'test', amount: 1 })

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(updatedCartItems);
                done();
            });
        });

        it('should return the update cart Map', (done: DoneFn) => {
            const testProduct = { id: 1, name: 'test' };
            const updatedCartItems = new Map().set(1, { name: 'test', amount: 1 })

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(updatedCartItems);
                done();
            });
        });

        it('should return the current cart Map as the product id is a negative integer', (done: DoneFn) => {
            const testProduct = { id: -1, name: 'test' };
            const updatedCartItems = new Map()

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(updatedCartItems);
                done();
            });
        });

        it('should return the current cart Map as the product id is NaN', (done: DoneFn) => {
            const testProduct = { id: NaN, name: 'test' };
            const updatedCartItems = new Map()

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(updatedCartItems);
                done();
            });
        });
    });

    describe('removeFromCart()', () => {
        it('should return true if the product was succesfully removed from the cart', (done: DoneFn) => {
            const testProduct = { id: 0, name: 'test' };
            const updatedCartItems = new Map().set(0, { name: 'test', amount: 1 })

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            expect(shoppingCartService.removeFromCart(0)).toBe(true);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(new Map());
                done();
            });
        });

        it('should return false if the product was succesfully removed from the cart', (done: DoneFn) => {
            const testProduct = { id: 0, name: 'test' };
            const updatedCartItems = new Map().set(0, { name: 'test', amount: 1 })

            expect(shoppingCartService.addToCart(testProduct)).toEqual(updatedCartItems);
            expect(shoppingCartService.removeFromCart(1)).toBe(false);
            
            shoppingCartService.getCartContent().subscribe(cart => {
                expect(cart).toEqual(updatedCartItems);
                done();
            });
        });
    });
  });
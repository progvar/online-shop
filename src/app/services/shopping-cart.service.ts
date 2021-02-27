import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, ProductToAdd } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    private cart: Map<number, CartItem> = new Map();
    private cart$: BehaviorSubject<Map<number, CartItem>> = new BehaviorSubject(this.cart);

    addToCart(productToAdd: ProductToAdd): Map<number, CartItem> {
        const { id, name } = productToAdd;
        const cartItem = this.cart.get(id) || { name, amount: 0 };
        const cart = this.cart.set(id, { ...cartItem, amount: cartItem.amount + 1 });

        this.cart$.next(cart);
        
        return cart;
    }

    removeFromCart(productId: number): boolean {
        const isDeleted = this.cart.delete(productId);

        this.cart$.next(this.cart);

        return isDeleted;
    }

    getCartContent(): Observable<Map<number, CartItem>> {
        return this.cart$.asObservable();
    }
}
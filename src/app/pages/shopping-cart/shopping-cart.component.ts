import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cart$ = this.shoppingCartService.getCartContent();

  constructor(private shoppingCartService: ShoppingCartService) {}

  removeFromCart(productId: number) {
    this.shoppingCartService.removeFromCart(productId);
  }
}

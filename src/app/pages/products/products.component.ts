import { Component } from '@angular/core';
import { ProductToAdd } from 'src/app/models/models';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  recommendedProducts$ = this.productsService.getRecommendedProducts();
  isLoading$ = this.productsService.isDataLoading$;

  constructor(
    private productsService: ProductsService, 
    private shoppingCartService: ShoppingCartService
  ) {}

  addToCart(cartItem: ProductToAdd) {
    this.shoppingCartService.addToCart(cartItem);
  }
}

import { Component } from '@angular/core';
import { ProductToAdd } from 'src/app/models/models';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$ = this.productService.getRecommendedProducts();
  recommendedProducts$ = this.productService.getRecommendedProducts();

  constructor(
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService
  ) {}

  addToCart(cartItem: ProductToAdd) {
    this.shoppingCartService.addToCart(cartItem);
  }

}

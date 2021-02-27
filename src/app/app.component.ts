import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productsInCart$ = this.shoppingCartService.getCartContent().pipe(map(cart => cart.size));

  constructor(private shoppingCartService: ShoppingCartService) {}
}

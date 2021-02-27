import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';


@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }

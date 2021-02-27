import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$ = this.productService.getAllProducts();
  recommendedProducts$ = this.productService.getRecommendedProducts();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

}

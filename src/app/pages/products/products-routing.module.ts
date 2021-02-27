import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";

const productRoutes: Routes = [
    {
      path: '',
      component: ProductsComponent
    }
];

  @NgModule({
    imports: [CommonModule, RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
  })
  export class ProductsRoutingModule { }
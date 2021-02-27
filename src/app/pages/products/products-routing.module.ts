import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
    {
      path: '',
      component: ProductsComponent
    }
];

  @NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductsRoutingModule { }
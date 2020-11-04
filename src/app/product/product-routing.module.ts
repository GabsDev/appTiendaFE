import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductAllComponent } from "./product-all/product-all.component";

import { ProductIndexComponent } from "./product-index/product-index.component";
import { ProductShowComponent } from "./product-show/product-show.component";

const routes: Routes = [
  { path: 'product', component: ProductIndexComponent },
  { path: "product/all", component: ProductAllComponent },
  { path: "product/:id", component: ProductShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

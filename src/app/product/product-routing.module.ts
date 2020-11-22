import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductAllComponent } from "./product-all/product-all.component";
import { ProductCreateComponent } from "./product-create/product-create.component";

import { ProductIndexComponent } from "./product-index/product-index.component";
import { ProductShowComponent } from "./product-show/product-show.component";
import { ProductUpdateComponent } from "./product-update/product-update.component";

const routes: Routes = [
  { path: "product", component: ProductIndexComponent },
  { path: "product/all", component: ProductAllComponent },
  { path: "product/:id", component: ProductShowComponent },
  { path: "product/create", component: ProductCreateComponent },
  { path: "product/update", component: ProductUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

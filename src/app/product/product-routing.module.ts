import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductIndexComponent } from "./product-index/product-index.component";

import { ProductAllComponent } from "./product-all/product-all.component";
import { ProductCreateComponent } from "./product-create/product-create.component";
import { ProductUpdateComponent } from "./product-update/product-update.component";

import { ProductShowComponent } from "./product-show/product-show.component";
import { ProductUpdateFormComponent } from "./product-update-form/product-update-form.component";

const routes: Routes = [
  { path: "product", component: ProductIndexComponent },
  { path: "product/all", component: ProductAllComponent },
  { path: "product/create", component: ProductCreateComponent },
  { path: "product/update", component: ProductUpdateComponent },
  { path: "product/update/form/:id", component: ProductUpdateFormComponent },
  { path: "product/:id", component: ProductShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

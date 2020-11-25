import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product-routing.module";

import { ProductIndexComponent } from "./product-index/product-index.component";
import { ProductAllComponent } from "./product-all/product-all.component";

import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ProductCreateComponent } from "./product-create/product-create.component";
import { ProductShowComponent } from "./product-show/product-show.component";
import { ProductUpdateComponent } from "./product-update/product-update.component";
import { ProductUpdateFormComponent } from "./product-update-form/product-update-form.component";

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ProductIndexComponent,
    ProductAllComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductShowComponent,
    ProductUpdateFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ProductRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}

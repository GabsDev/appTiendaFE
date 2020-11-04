import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product-routing.module";

import { ProductIndexComponent } from "./product-index/product-index.component";
import { ProductAllComponent } from "./product-all/product-all.component";
import { ProductShowComponent } from "./product-show/product-show.component";

import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    ProductIndexComponent,
    ProductAllComponent,
    ProductShowComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ProductRoutingModule,
  ],
})
export class ProductModule {}

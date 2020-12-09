import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderIndexComponent } from "./order-index/order-index.component";
import { OrderCreateComponent } from "./order-create/order-create.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderIndexComponent, OrderCreateComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OrderRoutingModule],
})
export class OrderModule {}

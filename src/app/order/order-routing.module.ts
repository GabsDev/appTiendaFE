import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderIndexComponent } from "./order-index/order-index.component";

const routes: Routes = [
  { path: "orders", component: OrderIndexComponent },
  { path: "orders/create", component: OrderCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

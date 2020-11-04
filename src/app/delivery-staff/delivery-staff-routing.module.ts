import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeliveryAllComponent } from "./delivery-all/delivery-all.component";

import { DeliveryIndexComponent } from "./delivery-index/delivery-index.component";
import { DeliveryShowComponent } from "./delivery-show/delivery-show.component";

const routes: Routes = [
  { path: "staff/delivery", component: DeliveryIndexComponent },
  { path: "staff/delivery/all", component: DeliveryAllComponent },
  { path: "staff/delivery/:id", component: DeliveryShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryStaffRoutingModule {}

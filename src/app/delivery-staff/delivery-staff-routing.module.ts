import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeliveryAllComponent } from "./delivery-all/delivery-all.component";
import { DeliveryCreateComponent } from "./delivery-create/delivery-create.component";

import { DeliveryIndexComponent } from "./delivery-index/delivery-index.component";
import { DeliveryShowComponent } from "./delivery-show/delivery-show.component";
import { DeliveryUpdateComponent } from "./delivery-update/delivery-update.component";

const routes: Routes = [
  { path: "staff/delivery", component: DeliveryIndexComponent },
  { path: "staff/delivery/all", component: DeliveryAllComponent },
  { path: "staff/delivery/create", component: DeliveryCreateComponent },
  { path: "staff/delivery/update/:id", component: DeliveryUpdateComponent },
  { path: "staff/delivery/:id", component: DeliveryShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryStaffRoutingModule {}

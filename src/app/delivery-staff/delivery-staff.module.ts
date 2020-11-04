import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeliveryStaffRoutingModule } from "./delivery-staff-routing.module";
import { DeliveryIndexComponent } from "./delivery-index/delivery-index.component";
import { DeliveryAllComponent } from "./delivery-all/delivery-all.component";
import { DeliveryShowComponent } from "./delivery-show/delivery-show.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    DeliveryIndexComponent,
    DeliveryAllComponent,
    DeliveryShowComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    DeliveryStaffRoutingModule,
  ],
})
export class DeliveryStaffModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeliveryStaffRoutingModule } from "./delivery-staff-routing.module";
import { DeliveryIndexComponent } from "./delivery-index/delivery-index.component";
import { DeliveryAllComponent } from "./delivery-all/delivery-all.component";
import { DeliveryShowComponent } from "./delivery-show/delivery-show.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { DeliveryUpdateComponent } from './delivery-update/delivery-update.component';
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';

@NgModule({
  declarations: [
    DeliveryIndexComponent,
    DeliveryAllComponent,
    DeliveryShowComponent,
    DeliveryUpdateComponent,
    DeliveryCreateComponent,
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

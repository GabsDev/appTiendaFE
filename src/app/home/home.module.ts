import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CarouselModule } from "ngx-bootstrap/carousel";

import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  TooltipModule,
  PopoverModule,
  CollapseModule,
  AlertModule,
} from "ngx-bootstrap";

@NgModule({
  declarations: [HomeComponent, AboutUsComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    HomeRoutingModule,
  ],
})
export class HomeModule {}

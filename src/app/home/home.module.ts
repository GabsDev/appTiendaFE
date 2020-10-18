import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CarouselModule } from "ngx-bootstrap/carousel";

@NgModule({
  declarations: [HomeComponent, AboutUsComponent],
  imports: [CommonModule, CarouselModule.forRoot(), HomeRoutingModule],
})
export class HomeModule {}

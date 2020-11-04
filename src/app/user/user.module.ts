import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";

import { UserCreateComponent } from "./user-create/user-create.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserIndexComponent } from "./user-index/user-index.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import {
  BsDropdownModule,
  ProgressbarModule,
  TooltipModule,
  PopoverModule,
  CollapseModule,
  TabsModule,
  PaginationModule,
  AlertModule,
  BsDatepickerModule,
  CarouselModule,
  ModalModule,
} from "ngx-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [UserCreateComponent, UserLoginComponent, UserIndexComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule,
  ],
})
export class UserModule {}

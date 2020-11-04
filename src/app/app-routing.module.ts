import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home/home.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent, redirectTo: "", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

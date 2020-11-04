import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserCreateComponent } from './user-create/user-create.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: "user",
    component: UserIndexComponent,
    children: [
      { path: "register", component: UserCreateComponent },
      { path: "login", component: UserLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

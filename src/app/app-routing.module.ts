import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { Custom404Component } from "./errors/custom404/custom404.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: Custom404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

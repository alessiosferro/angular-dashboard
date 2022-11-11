import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from "@/pages/login/login.page";
import {DashboardComponent} from "@/pages/dashboard/dashboard.component";
import {DashboardGuard} from "./guards/dashboard.guard";
import {LoginGuard} from "./guards/login.guard";
import {UserResolver} from "./resolvers/user.resolver";
import {MessagesResolver} from "./resolvers/messages.resolver";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    resolve: {
      user: UserResolver,
      messages: MessagesResolver,
    }
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPage,
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

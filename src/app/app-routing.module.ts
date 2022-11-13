import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '@/components/pages/login/login-page.component';
import { DashboardComponent } from '@/components/pages/dashboard/dashboard.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { LoginGuard } from './guards/login.guard';
import { UserResolver } from './resolvers/user.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { RegisterPageComponent } from '@/components/pages/register/register-page.component';
import { ForgotPasswordPageComponent } from '@/components/pages/forgot-password/forgot-password-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    resolve: {
      user: UserResolver,
      messages: MessagesResolver,
    },
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

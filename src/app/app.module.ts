import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginPageComponent } from '@/components/pages/login/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/atoms/input/input.component';
import { InputTextComponent } from './components/atoms/input-text/input-text.component';
import { InputPasswordComponent } from './components/atoms/input-password/input-password.component';
import { InputEmailComponent } from './components/atoms/input-email/input-email.component';
import { ButtonComponent } from '@/components/atoms/button/button.component';
import { DashboardComponent } from '@/components/pages/dashboard/dashboard.component';
import { ForgotPasswordPageComponent } from '@/components/pages/forgot-password/forgot-password-page.component';
import { RegisterPageComponent } from '@/components/pages/register/register-page.component';
import { AuthComponent } from './components/layouts/auth/auth.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { LoadingSpinnerComponent } from './components/atoms/loading-spinner/loading-spinner.component';
import { DashboardHeaderComponent } from './components/features/dashboard-header/dashboard-header.component';
import { DashboardMessageListComponent } from './components/features/dashboard-message-list/dashboard-message-list.component';
import { DashboardMessageFormComponent } from './components/features/dashboard-message-form/dashboard-message-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputComponent,
    DashboardComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputEmailComponent,
    ButtonComponent,
    ForgotPasswordPageComponent,
    RegisterPageComponent,
    AuthComponent,
    AuthComponent,
    SafeHtmlPipe,
    LoadingSpinnerComponent,
    DashboardMessageListComponent,
    DashboardMessageFormComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

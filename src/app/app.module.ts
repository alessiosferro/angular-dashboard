import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {LoginPage} from "./pages/login/login.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from './components/input/input.component';
import {InputTextComponent} from './components/input-text/input-text.component';
import {InputPasswordComponent} from './components/input-password/input-password.component';
import {InputEmailComponent} from './components/input-email/input-email.component';
import {ButtonComponent} from "@/components/button/button.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    InputComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputEmailComponent,
    ButtonComponent,
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
  providers: [
    ScreenTrackingService, UserTrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

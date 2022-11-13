import {Component} from '@angular/core';
import {AppLink, UserLogin} from "@/model/interfaces";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  showSubmitMessage = false;

  links: AppLink[] = [
    {
      routerLink: '/auth/login',
      label: 'Remembered password? Login instead',
      show: true,
    },
  ];

  constructor(
    private angularFireAuthService: AngularFireAuth
  ) {
  }

  submitHandler(formData: Partial<UserLogin>): void {
    if (!formData.email) {
      return alert('Please insert your email');
    }

    fromPromise(this.angularFireAuthService.sendPasswordResetEmail(formData.email)).subscribe(() => {
      this.links = [
        {
          routerLink: '/auth/login',
          label: 'Back to login',
          show: true
        }
      ];

      this.showSubmitMessage = true;
    });
  }
}

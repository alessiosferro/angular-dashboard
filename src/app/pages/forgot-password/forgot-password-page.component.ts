import {Component} from '@angular/core';
import {AppLink, UserLogin} from "@/model/interfaces";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  submitMessage!: string;

  links: AppLink[] = [
    {
      routerLink: '/auth/login',
      label: 'Remembered password? Login instead'
    }
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
      this.submitMessage = `Please check your inbox. If <strong>${formData.email}</strong> exists you will receive a link for resetting your password.`
    });
  }
}

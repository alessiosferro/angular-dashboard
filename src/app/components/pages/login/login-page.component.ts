import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FirebaseService } from '@/services/firebase/firebase.service';
import { UtilsService } from '@/services/utils/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppForm, Nullable } from '@/model/types';
import { AppLink, UserLogin } from '@/model/interfaces';
import { Router } from '@angular/router';
import { Observable, of, switchMap, throwError } from 'rxjs';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup<AppForm<UserLogin>>;
  user$!: Observable<Nullable<firebase.User>>;
  links: AppLink[] = [
    {
      routerLink: '/auth/register',
      label: 'New User? Create account',
      show: true,
    },
    {
      routerLink: '/auth/forgot-password',
      label: 'Forgot password?',
      show: true,
    },
  ];

  constructor(
    private formBuilderService: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilderService.group<AppForm<UserLogin>>({
      email: this.formBuilderService.control('', [Validators.email]),
      password: this.formBuilderService.control(''),
    });
  }

  submitHandler(formData: Partial<UserLogin>) {
    this.firebaseService
      .signIn(formData)
      .pipe(
        switchMap((response) => {
          if (!response.user || response.user.emailVerified)
            return of(response);
          return throwError(
            () =>
              'Check your inbox and verify the email to login in the dashboard.'
          );
        })
      )
      .subscribe({
        next: () => this.router.navigate(['dashboard']),
        error: (err) => alert(err),
      });
  }
}

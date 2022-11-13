import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppLink, UserLogin} from "@/model/interfaces";
import {switchMap, take} from "rxjs";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppForm} from "@/model/types";
import {UtilsService} from "@/services/utils/utils.service";

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup<AppForm<UserLogin>>
  showSubmitMessage = false;
  links: AppLink[] = [
    {
      routerLink: '/auth/login',
      label: 'Already have account? Login',
      show: true,
    }
  ];

  constructor(
    private firebaseService: FirebaseService,
    private formBuilderService: FormBuilder,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilderService.group<AppForm<UserLogin>>({
      email: this.formBuilderService.control('', [Validators.email]),
      password: this.formBuilderService.control('')
    });
  }


  submitHandler(formData: Partial<UserLogin>): void {
    this.firebaseService.createUser(formData).pipe(
      switchMap(() => this.firebaseService.sendVerificationEmail()),
      take(1)
    ).subscribe({
      next: () => {
        this.showSubmitMessage = true;
      },
      error: (err) => alert(err)
    });
  }
}

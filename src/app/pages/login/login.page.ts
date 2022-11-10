import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {UtilsService} from "@/services/utils/utils.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPageForm} from "@/model/types";
import {UserLogin} from "@/model/interfaces";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import firebase from 'firebase/compat';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup<LoginPageForm>;
  user$!: Observable<firebase.User | null>;
  isNewAccount = false;

  constructor(
    private formBuilderService: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilderService.group<LoginPageForm>({
      email: this.formBuilderService.control('', [Validators.email]),
      password: this.formBuilderService.control('')
    });
  }

  submitHandler(formData: Partial<UserLogin>) {
    if (this.isNewAccount) {
      this.firebaseService.createUser(formData).subscribe({
        next: () => this.router.navigate(['dashboard']),
        error: (err) => alert(err)
      });
      return;
    }

    this.firebaseService.signIn(formData).subscribe({
      next: () => this.router.navigate(['dashboard']),
      error: (err) => alert(err)
    });
  }
}

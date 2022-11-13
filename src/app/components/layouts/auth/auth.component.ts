import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {UtilsService} from "@/services/utils/utils.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppForm, Nullable} from "@/model/types";
import {AppLink, UserLogin} from "@/model/interfaces";
import {Observable} from "rxjs";
import firebase from 'firebase/compat';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Input() title!: string;
  @Input() copy: string | undefined;
  @Input() links: AppLink[] = [];
  @Input() hasPasswordControl = true;
  @Input() showResetPasswordMessage = false;
  @Input() showRegisterAccountMessage = false;

  @Output() submitForm = new EventEmitter<Partial<UserLogin>>();

  form!: FormGroup<AppForm<UserLogin>>;
  user$!: Observable<Nullable<firebase.User>>;

  constructor(
    private formBuilderService: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilderService.group<AppForm<UserLogin>>({
      email: this.formBuilderService.control('', [Validators.email]),
      password: this.formBuilderService.control('')
    });
  }

  googleHandler(): void {
    this.firebaseService.loginWithGoogle().subscribe(() => {
      this.router.navigate(['dashboard'])
    });
  }
}

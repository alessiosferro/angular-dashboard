import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {UtilsService} from "@/services/utils/utils.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "@/model/types";
import {UserLogin} from "@/model/interfaces";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {UserService} from "@/services/user/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup<LoginPageForm>;

  constructor(
    private formBuilderService: FormBuilder,
    public firebaseService: FirebaseService,
    public userService: UserService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilderService.group<LoginPageForm>({
      email: this.formBuilderService.control(''),
      password: this.formBuilderService.control('')
    }, {
      updateOn: 'blur'
    })
  }

  async submitHandler(formData: Partial<UserLogin>): Promise<void> {
    fromPromise(this.firebaseService.signIn(formData))
      .subscribe(({data, error}) => {
        if (!data) {
          alert(error);
          return;
        }

        this.userService.user = data;
        this.form.reset();
      });
  }
}

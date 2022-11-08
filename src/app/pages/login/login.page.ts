import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {UtilsService} from "@/services/utils/utils.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "@/model/types";
import {UserLogin} from "@/model/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form!: FormGroup<LoginPageForm>;

  constructor(
    private formBuilderService: FormBuilder,
    public firebaseService: FirebaseService,
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
    const {data, error} = await this.firebaseService.signIn(formData);

    if (error) {
      alert(`Error: ${error}`);
      return;
    }

    console.log(data);

    alert(`User logged in: ${data!.user?.email}`);
    this.form.reset();
  }
}

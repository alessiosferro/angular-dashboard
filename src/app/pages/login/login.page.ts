import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "../../services/firebase/firebase.service";
import {UserLogin} from "../../model/types";
import {UtilsService} from "../../services/utils/utils.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public userLogin: UserLogin = {
    password: '',
    email: ''
  };

  constructor(public firebaseService: FirebaseService, public utilsService: UtilsService) {
  }

  ngOnInit() {

  }
}

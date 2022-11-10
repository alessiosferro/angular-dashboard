import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<unknown> {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  resolve() {
    return this.angularFireAuth.user;
  }
}

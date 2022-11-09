import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {UserLoginResponse} from "@/model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<UserLoginResponse | null>(null);

  get user() {
    return this._user.getValue();
  }

  set user(user: any) {
    this._user.next(user);
  }

  get user$() {
    return this._user.asObservable();
  }
}

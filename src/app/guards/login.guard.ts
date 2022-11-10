import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFireAuth.user.pipe(
      map((user) => !user || this.router.createUrlTree(['dashboard']))
    );
  }
}

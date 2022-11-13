import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserLogin} from "@/model/interfaces";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {filter, Observable, switchMap, throwError} from "rxjs";
import {GoogleAuthProvider} from 'firebase/auth';
import {strings} from "../../../strings";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private googleAuthProvider = new GoogleAuthProvider();

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  signIn({email, password}: Partial<UserLogin>) {
    if (!email || !password) {
      return throwError(() => strings.loginFormError)
    }

    return fromPromise(this.angularFireAuth.signInWithEmailAndPassword(email, password))
  }

  sendVerificationEmail(): Observable<void> {
    return this.angularFireAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => fromPromise(user!.sendEmailVerification()))
    );
  }

  signOut() {
    return fromPromise(this.angularFireAuth.signOut());
  }

  loginWithGoogle() {
    return fromPromise(this.angularFireAuth.signInWithPopup(this.googleAuthProvider));
  }

  createUser({email, password}: Partial<UserLogin>) {
    if (!email || !password) {
      return throwError(() => strings.loginFormError);
    }

    return fromPromise(this.angularFireAuth.createUserWithEmailAndPassword(email, password));
  }
}

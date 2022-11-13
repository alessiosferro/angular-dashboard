import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Message, UserLogin} from "@/model/interfaces";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {filter, map, Observable, switchMap, throwError} from "rxjs";
import {GoogleAuthProvider} from 'firebase/auth';
import {strings} from "../../../strings";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private googleAuthProvider = new GoogleAuthProvider();

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
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

  getMessages(): Observable<Message[]> {
    return this.angularFireDatabase.object<Message>('messages').valueChanges().pipe(
      map(messages => Object.entries(messages!).reduce((acc, [id, value]) => [...acc, {id, ...value} as Message], [] as Message[]))
    )
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

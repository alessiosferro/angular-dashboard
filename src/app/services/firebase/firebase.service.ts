import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserLogin} from "@/model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private angularFireAuth: AngularFireAuth) {
  }

  async signIn({email, password}: Partial<UserLogin>) {
    if (!email || !password) {
      return {
        data: null,
        error: 'Please enter email and password.'
      }
    }

    try {
      return {
        data: await this.angularFireAuth.signInWithEmailAndPassword(email, password),
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }

  async createUser({email, password}: Partial<UserLogin>) {
    if (!email || !password) {
      return {
        data: null,
        error: 'Please enter email and password.'
      }
    }

    try {
      return {
        data: await this.angularFireAuth.createUserWithEmailAndPassword(email, password),
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }
}

import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserLogin} from "../../model/types";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private angularFireAuth: AngularFireAuth) {
  }

  async createUser({email, password}: UserLogin) {
    try {
      const response = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);

      if (!response.user) {
        return;
      }

      alert(`User created: ${response.user.email}`);
    } catch (err) {
      console.error(err);
    }
  }
}

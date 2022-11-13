import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Nullable } from '@/model/types';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Nullable<firebase.User>> {
  constructor(private angularFireAuth: AngularFireAuth) {}

  resolve() {
    return this.angularFireAuth.user;
  }
}

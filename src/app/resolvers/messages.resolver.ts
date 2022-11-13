import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Message} from "@/model/interfaces";
import {Observable, take} from "rxjs";
import {FirebaseService} from "@/services/firebase/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]> {

  constructor(
    private firebaseService: FirebaseService,
  ) {
  }

  resolve(): Observable<Message[]> {
    return this.firebaseService.getMessages().pipe(
      take(1)
    );
  }
}

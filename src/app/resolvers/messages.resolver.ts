import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Message} from "@/model/interfaces";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]> {

  constructor(
    private firebaseRealtimeDatabaseService: AngularFireDatabase,
  ) {
  }
  
  resolve(): Observable<Message[]> {
    return this.firebaseRealtimeDatabaseService.list<Message>('messages').valueChanges().pipe(
      take(1)
    );
  }
}

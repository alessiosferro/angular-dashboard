import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, merge, Observable, skip, switchMap, takeUntil } from 'rxjs';
import firebase from 'firebase/compat';
import { ActivatedRoute } from '@angular/router';
import { Message } from '@/model/interfaces';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { DestroySubject } from '../../../classes/DestroySubject';
import { UtilsService } from '@/services/utils/utils.service';
import { FirebaseService } from '@/services/firebase/firebase.service';

@Component({
  selector: 'app-dashboard-message-list',
  templateUrl: './dashboard-message-list.component.html',
  styleUrls: ['./dashboard-message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMessageListComponent
  extends DestroySubject
  implements OnInit, OnDestroy
{
  notificationSound = new Audio('/assets/notification.mp3');
  selectedMessageId = '';

  messages$!: Observable<Message[]>;
  user$!: Observable<firebase.User | null>;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private firebaseService: FirebaseService,
    public angularFireAuthService: AngularFireAuth,
    public utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.messages$ = merge(
      this.activatedRouteService.data.pipe(map((data) => data['messages'])),
      this.firebaseService.getMessages()
    );

    this.messages$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      window.scrollTo({ top: document.body.scrollHeight });
    });

    this.messages$
      .pipe(
        // skip first 2 emissions to avoid the DOM exception
        skip(2),
        switchMap(() => fromPromise(this.notificationSound.play())),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.user$ = this.activatedRouteService.data.pipe(
      map((data) => data['user'])
    );
  }

  addEmojiToMessage(): void {
    return;
  }
}

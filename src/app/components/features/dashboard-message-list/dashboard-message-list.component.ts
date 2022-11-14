import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, merge, Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { ActivatedRoute } from '@angular/router';
import { EmojiSelected, Message, MessageEmoji } from '@/model/interfaces';
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
  selectedMessageId = '';
  emojiSelected: EmojiSelected | null = null;

  messages$!: Observable<Message[]>;
  user$!: Observable<firebase.User | null>;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private firebaseService: FirebaseService,
    private cdRef: ChangeDetectorRef,
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

    this.user$ = this.activatedRouteService.data.pipe(
      map((data) => data['user'])
    );
  }

  addEmojiHandler(params: { event: MouseEvent; message: Message }): void {
    const { event, message } = params;

    const input = event.target as HTMLInputElement;

    this.firebaseService
      .addEmojiToMessage({
        message,
        emoji: input.value,
      })
      .subscribe(() => {
        this.selectedMessageId = '';
        this.cdRef.markForCheck();
      });
  }

  openEmojiExplorer(params: {
    event: MouseEvent;
    selectedMessage: Message;
    selectedEmoji: MessageEmoji;
  }): void {
    const { event, selectedMessage, selectedEmoji } = params;

    event.stopPropagation();

    this.emojiSelected = {
      selectedMessage,
      selectedEmoji,
    };
  }

  getSelectedEmojis(): MessageEmoji[] {
    if (!this.emojiSelected) return [];

    return this.emojiSelected.selectedMessage.emojis.filter(
      (messageEmoji) =>
        messageEmoji.emoji === this.emojiSelected?.selectedEmoji.emoji
    );
  }

  removeEmojiHandler(): void {
    if (!this.emojiSelected) return;

    const { selectedEmoji, selectedMessage } = this.emojiSelected;

    this.firebaseService
      .removeEmojiFromMessage(selectedMessage, selectedEmoji)
      .subscribe(() => {
        console.log('hello');
        this.emojiSelected = null;
        this.cdRef.detectChanges();
      });
  }
}

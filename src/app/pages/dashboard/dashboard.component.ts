import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, merge, Observable, Subject, take, takeUntil} from "rxjs";
import firebase from "firebase/compat";
import {FirebaseService} from "@/services/firebase/firebase.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {DashboardForm, Message} from "@/model/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppForm} from "@/model/types";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  user$!: Observable<firebase.User | null>;
  messages$!: Observable<Message[]>;
  form!: FormGroup<AppForm<DashboardForm>>;
  destroy$ = new Subject<void>();

  @ViewChild('messageList')
  messageList!: ElementRef<HTMLDivElement>;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firebaseRealtimeDatabaseService: AngularFireDatabase,
    private formBuilderService: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.messages$ = merge(
      this.activatedRouteService.data.pipe(map(data => data['messages'])),
      this.firebaseRealtimeDatabaseService.list<Message>('messages').valueChanges()
    );

    this.form = this.formBuilderService.group<AppForm<DashboardForm>>({
      text: this.formBuilderService.control('', [Validators.required])
    });

    this.user$ = this.activatedRouteService.data.pipe(
      map(data => data['user']),
    );
  }

  ngAfterViewInit(): void {
    this.messages$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.messageList.nativeElement.scrollTo({top: this.messageList.nativeElement.scrollHeight}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  submitMessageHandler(formData: Partial<DashboardForm>): void {
    this.user$.pipe(
      filter(user => !!user),
      take(1),
      map(user => user!.email)
    ).subscribe(email => {
      this.firebaseRealtimeDatabaseService.list('messages').push({
        created_at: new Date().toISOString(),
        text: formData.text,
        author: email
      });

      this.form.reset();
    });
  }

  logout() {
    this.firebaseService.signOut().subscribe(() => this.router.navigate(['auth', 'login']))
  }
}

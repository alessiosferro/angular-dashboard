import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, Observable, take, tap} from "rxjs";
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
export class DashboardComponent implements OnInit {
  user$!: Observable<firebase.User | null>;
  messages$!: Observable<Message[]>;
  form!: FormGroup<AppForm<DashboardForm>>;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firebaseRealtimeDatabaseService: AngularFireDatabase,
    private formBuilderService: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.messages$ = this.firebaseRealtimeDatabaseService.list<Message>('messages').valueChanges();

    this.form = this.formBuilderService.group<AppForm<DashboardForm>>({
      text: this.formBuilderService.control('', [Validators.required])
    });

    this.user$ = this.activatedRouteService.data.pipe(
      map(data => data['user']),
      tap(console.log)
    );

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

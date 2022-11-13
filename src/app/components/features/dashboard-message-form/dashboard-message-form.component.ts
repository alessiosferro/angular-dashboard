import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DashboardForm } from '@/model/interfaces';
import { filter, take } from 'rxjs';
import { AppForm } from '@/model/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard-message-form',
  templateUrl: './dashboard-message-form.component.html',
  styleUrls: ['./dashboard-message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMessageFormComponent implements OnInit {
  @Input() maxLength = 2000;
  @Input() minLength = 1;
  form!: FormGroup<AppForm<DashboardForm>>;

  constructor(
    private formBuilderService: FormBuilder,
    private angularFireDatabaseService: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilderService.group<AppForm<DashboardForm>>({
      text: this.formBuilderService.control('', [
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        Validators.required,
      ]),
    });
  }

  submitMessageHandler(formData: Partial<DashboardForm>): void {
    if (this.form.invalid) return;

    this.angularFireAuth.user
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe((user) => {
        this.angularFireDatabaseService.list('messages').push({
          created_at: new Date().toISOString(),
          text: formData.text,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        });

        this.form.reset({
          text: '',
        });
      });
  }
}

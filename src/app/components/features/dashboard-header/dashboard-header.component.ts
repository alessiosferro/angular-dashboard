import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FirebaseService } from '@/services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  @Input() title!: string;

  frogSound = new Audio('/assets/frog.mp3');

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  logout() {
    this.firebaseService
      .signOut()
      .subscribe(() => this.router.navigate(['auth', 'login']));
  }
}

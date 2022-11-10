import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import firebase from "firebase/compat";
import {FirebaseService} from "@/services/firebase/firebase.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  user$!: Observable<firebase.User | null>;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user$ = this.activatedRouteService.data.pipe(
      map(data => data['user'])
    );

  }

  logout() {
    this.firebaseService.signOut().subscribe(() => this.router.navigate(['auth', 'login']))
  }
}

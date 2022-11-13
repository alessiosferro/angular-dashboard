import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFireAuth.user.pipe(
      map(
        (user) =>
          user?.emailVerified || this.router.createUrlTree(['auth', 'login'])
      )
    );
  }
}

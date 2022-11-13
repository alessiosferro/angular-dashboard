import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import {filter, map, merge, Observable} from "rxjs";

dayjs.extend(isToday);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  title = 'angular-dashboard';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isLoading$ = merge(
      this.router.events.pipe(filter(event => event instanceof NavigationStart), map(() => true)),
      this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => false))
    );
  }
}

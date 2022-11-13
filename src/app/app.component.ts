import {Component} from '@angular/core';
import {Router} from "@angular/router";
import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dashboard';

  constructor(private router: Router) {

  }
}

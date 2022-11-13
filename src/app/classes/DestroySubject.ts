import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class DestroySubject {
  protected destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
  }
}

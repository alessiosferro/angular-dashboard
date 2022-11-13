import {Injectable} from "@angular/core";
import {strings} from "../../../strings";
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  get applicationStrings() {
    return strings;
  }

  get dayjs() {
    return dayjs;
  }
}

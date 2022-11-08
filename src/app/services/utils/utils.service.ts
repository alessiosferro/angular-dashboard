import {Injectable} from "@angular/core";
import {strings} from "../../../strings";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  get applicationStrings() {
    return strings;
  }
}

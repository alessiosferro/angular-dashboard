import type {FormControl} from "@angular/forms";
import {UserLogin} from "@/model/interfaces";

export type InputType = 'text' | 'email' | 'password' | 'radio' | 'checkbox';

export type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';

export type LoginPageForm = {
  [T in keyof UserLogin]: FormControl<UserLogin[T] | null>
};

import type {FormControl} from "@angular/forms";
import {UserLogin} from "@/model/interfaces";

export type InputType = 'text' | 'email' | 'password' | 'radio' | 'checkbox';

export type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';

export type Nullable<T> = T | null;

export type LoginPageForm = {
  [T in keyof UserLogin]: FormControl<Nullable<UserLogin[T]>>
};

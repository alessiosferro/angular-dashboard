import type { FormControl } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'radio' | 'checkbox';

export type ButtonVariant =
  | 'icon'
  | 'primary'
  | 'secondary'
  | 'primary-outline'
  | 'secondary-outline'
  | 'link';

export type Nullable<T> = T | null;

export type AppForm<K> = {
  [T in keyof K]: FormControl<Nullable<K[T]>>;
};

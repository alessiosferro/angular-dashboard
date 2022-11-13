import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() group!: FormGroup;
  @Input() placeholder = '';
}

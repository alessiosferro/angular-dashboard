import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() group!: FormGroup;
  @Input() placeholder = '';
}

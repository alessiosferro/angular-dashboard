import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() autocomplete: string | undefined;
  @Input() label!: string;
  @Input() group!: FormGroup;
  @Input() placeholder = '';
}

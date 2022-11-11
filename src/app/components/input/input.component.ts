import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {InputType} from "@/model/types";
import type {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() type!: InputType;
  @Input() autocomplete: string | undefined;
  @Input() label!: string;
  @Input() group!: FormGroup;
  @Input() placeholder!: string;
}

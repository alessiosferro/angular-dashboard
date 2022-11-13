import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ButtonVariant} from "@/model/types";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'button';
  @Input() routerLink: string | undefined;
  @Input() variant!: ButtonVariant;
  @Input() className: string | undefined;
  @Input() iconSrc: string | undefined;
  @Input() height: string | undefined;
  @Input() width: string | undefined;
  @Output() clickHandler = new EventEmitter<MouseEvent>();

  ngClass: { [key: string]: boolean } = {};

  ngOnInit() {
    this.ngClass = {
      'button': true,
      'button-icon': this.variant === 'icon',
      'button-primary': this.variant === 'primary',
      'button-primary-outline': this.variant === 'primary-outline',
      'button-secondary': this.variant === 'secondary',
      'button-secondary-outline': this.variant === 'secondary-outline',
      'button-link': this.variant === 'link',
      ...(this.className ? {[this.className]: true} : {}),
    };
  }
}

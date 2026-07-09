import { Component, ChangeDetectionStrategy, input, model, output } from '@angular/core';

@Component({
  selector: 'gds-checkbox',
  standalone: true,
  template: `
    <div class="check-wrap" (click)="toggle()">
      <div class="checkbox" [class.checkbox--checked]="checked()">
        @if (checked()) {
          <span>&#10003;</span>
        }
      </div>
      @if (label()) {
        <span class="label">{{ label() }}</span>
      }
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      font-family: $font-family-base;
    }

    .check-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      cursor: pointer;
    }

    .checkbox {
      width: 22px;
      height: 22px;
      border: 2px solid $color-background-border;
      border-radius: $border-radius-md;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 150ms ease;

      &--checked {
        background: $color-interactive-primary;
        border-color: $color-interactive-primary;
        color: $color-interactive-on-primary;
        font-size: 14px;
        font-weight: $font-weight-bold;
      }
    }

    .label {
      font-size: $font-size-md;
      color: $color-content-primary;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsCheckboxComponent {
  readonly label = input('');
  readonly checked = model(false);
  readonly changed = output<boolean>();

  toggle(): void {
    this.checked.set(!this.checked());
    this.changed.emit(this.checked());
  }
}

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'gds-radio',
  standalone: true,
  template: `
    <div class="radio-wrap" (click)="select.emit(value())">
      <div class="radio" [class.radio--selected]="selected()"></div>
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

    .radio-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      cursor: pointer;
    }

    .radio {
      width: 22px;
      height: 22px;
      border: 2px solid $color-background-border;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: border-color 150ms ease;

      &--selected {
        border-color: $color-interactive-primary;

        &::after {
          content: '';
          width: 12px;
          height: 12px;
          background: $color-interactive-primary;
          border-radius: 50%;
        }
      }
    }

    .label {
      font-size: $font-size-md;
      color: $color-content-primary;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsRadioComponent {
  readonly label = input('');
  readonly value = input('');
  readonly selected = input(false);
  readonly select = output<string>();
}

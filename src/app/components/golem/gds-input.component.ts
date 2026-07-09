import { Component, ChangeDetectionStrategy, input, output, model, signal } from '@angular/core';

@Component({
  selector: 'gds-input',
  standalone: true,
  template: `
    @if (label()) {
      <label class="input-label" [attr.for]="inputId()">{{ label() }}</label>
    }
    <input
      class="input-field"
      [class.input-field--mega]="variant() === 'mega'"
      [class.input-field--error]="error()"
      [class.input-field--disabled]="disabled()"
      [class.input-field--focused]="focused()"
      [id]="inputId()"
      [type]="type()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [value]="value()"
      (input)="onInput($event)"
      (focus)="focused.set(true)"
      (blur)="focused.set(false)"
    />
    @if (hint() && !error()) {
      <span class="input-hint">{{ hint() }}</span>
    }
    @if (error()) {
      <span class="input-error">{{ error() }}</span>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-family: $font-family-base;
    }

    .input-label {
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      color: $color-content-secondary;
    }

    .input-field {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid $color-background-border;
      border-radius: $border-radius-lg;
      font-family: $font-family-base;
      font-size: $font-size-md;
      color: $color-content-primary;
      background: $color-background-surface;
      outline: none;
      transition: border-color 150ms ease;
      box-sizing: border-box;

      &::placeholder {
        color: $color-content-quaternary;
      }

      &--focused {
        border-color: $color-interactive-primary;
        box-shadow: 0 0 0 3px rgba($color-interactive-primary, 0.1);
      }

      &--error {
        border-color: $color-attention-alert;
      }

      &--mega {
        font-size: $font-size-3xl;
        font-weight: $font-weight-bold;
        padding: 16px;
        text-align: center;
      }

      &--disabled {
        background: $color-background-surface-secondary;
        color: $color-content-disabled;
        cursor: not-allowed;
      }
    }

    .input-hint {
      font-size: $font-size-xs;
      color: $color-content-tertiary;
    }

    .input-error {
      font-size: $font-size-xs;
      color: $color-attention-alert;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsInputComponent {
  readonly variant = input<'basic' | 'mega'>('basic');
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input('text');
  readonly disabled = input(false);
  readonly hint = input('');
  readonly error = input('');
  readonly inputId = input('gds-input');
  readonly value = model('');

  readonly focused = signal(false);

  readonly inputChange = output<string>();

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.inputChange.emit(val);
  }
}

import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

@Component({
  selector: 'button[gds-button], a[gds-button]',
  standalone: true,
  template: `
    <ng-content />
    @if (label()) {
      <span class="gds-btn__label">{{ label() }}</span>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border: none;
      border-radius: $border-radius-full;
      font-family: $font-family-base;
      font-size: $font-size-md;
      font-weight: $font-weight-semibold;
      cursor: pointer;
      transition: background 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out;
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;

      &:hover:not([disabled]) {
        transform: translateY(-1px);
        box-shadow: $shadow-md;
      }

      &:active:not([disabled]) {
        transform: translateY(0);
      }

      &[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    :host(.gds-btn--primary) {
      background: $color-interactive-primary;
      color: $color-interactive-on-primary;
    }

    :host(.gds-btn--secondary) {
      background: transparent;
      color: $color-interactive-secondary;
      border: 1.5px solid $color-background-border;
    }

    :host(.gds-btn--tertiary) {
      background: transparent;
      color: $color-interactive-primary;
      padding: 12px 16px;
    }

    :host(.gds-btn--full) {
      width: 100%;
    }

    :host(.gds-btn--sm) {
      padding: 8px 16px;
      font-size: $font-size-sm;
    }
  `],
  host: {
    '[class.gds-btn--primary]': 'variant() === "button-primary"',
    '[class.gds-btn--secondary]': 'variant() === "button-secondary"',
    '[class.gds-btn--tertiary]': 'variant() === "button-tertiary"',
    '[class.gds-btn--full]': 'width() === "full-width"',
    '[attr.disabled]': 'disabled() || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsButtonComponent {
  readonly variant = input<'button-primary' | 'button-secondary' | 'button-tertiary'>('button-primary');
  readonly label = input('');
  readonly width = input<'full-width' | 'in-line'>('in-line');
  readonly disabled = input(false);
}

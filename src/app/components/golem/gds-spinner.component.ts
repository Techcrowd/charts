import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'gds-spinner',
  standalone: true,
  template: `<div class="spinner" [class.spinner--sm]="size() === 'sm'" [class.spinner--lg]="size() === 'lg'"></div>`,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid $color-background-border;
      border-top-color: $color-interactive-primary;
      border-radius: 50%;
      animation: spin 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite;

      &--sm {
        width: 20px;
        height: 20px;
        border-width: 2px;
      }

      &--lg {
        width: 48px;
        height: 48px;
        border-width: 4px;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsSpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

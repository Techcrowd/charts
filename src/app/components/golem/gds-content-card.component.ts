import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'gds-content-card',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      background: $color-background-surface;
      border-radius: $border-radius-lg;
      padding: 16px;
      box-shadow: 0 1px 2px $shadow-panel-top, 0 2px 8px $shadow-panel-middle;
      font-family: $font-family-base;
    }

    :host(.card-highlight) {
      border-left: 3px solid $color-interactive-primary;
    }

    :host(.card-flat) {
      box-shadow: none;
      border: 1px solid $color-background-border;
    }

    :host(.card-secondary) {
      background: $color-background-surface-secondary;
      box-shadow: none;
    }

    :host ::ng-deep h3 {
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      color: $color-content-primary;
      margin: 0 0 8px;
    }

    :host ::ng-deep p {
      font-size: $font-size-md;
      color: $color-content-secondary;
      margin: 0 0 4px;
      line-height: $line-height-relaxed;
    }
  `],
  host: {
    '[class.card-highlight]': 'variant() === "card-highlight"',
    '[class.card-secondary]': 'variant() === "card-secondary"',
    '[class.card-flat]': 'variant() === "card-flat"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsContentCardComponent {
  readonly variant = input<'card-primary' | 'card-secondary' | 'card-highlight' | 'card-flat'>('card-primary');
}

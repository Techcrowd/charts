import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'gds-button-bar-bottom',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      background: $color-background-surface;
      border-top: 1px solid $color-background-border;
      font-family: $font-family-base;
    }

    :host(.gds-bar--sticky) {
      position: relative;
      box-shadow: 0 -2px 8px $shadow-panel-top;
    }

    :host ::ng-deep [gds-button] {
      flex: 1;
    }
  `],
  host: {
    '[class.gds-bar--sticky]': 'sticky()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsButtonBarBottomComponent {
  readonly sticky = input(false);
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'gds-divider',
  standalone: true,
  template: ``,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      height: 1px;
      background: $color-background-border;
      margin: 8px 0;
      border: none;
    }

    :host(.gds-divider--thick) {
      height: 8px;
      background: $color-background-surface-secondary;
    }
  `],
  host: {
    'role': 'separator',
    '[class.gds-divider--thick]': 'thick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsDividerComponent {
  readonly thick = input(false);
}

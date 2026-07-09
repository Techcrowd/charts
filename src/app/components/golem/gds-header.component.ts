import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'gds-header',
  standalone: true,
  template: `
    @if (showBack()) {
      <span class="back" (click)="backClick.emit()">&#8592;</span>
    }
    <ng-content select="[slot=left]" />
    <span class="title">
      <ng-content />
      @if (title()) {
        {{ title() }}
      }
    </span>
    <ng-content select="[slot=right]" />
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      min-height: 56px;
      gap: 12px;
      font-family: $font-family-base;
      box-sizing: border-box;
    }

    :host(.gds-header--ground) {
      background: $color-interactive-secondary;
      color: $color-interactive-on-primary;
    }

    :host(.gds-header--nav) {
      background: $color-background-surface;
      border-bottom: 1px solid $color-background-border;
      color: $color-content-primary;
    }

    :host(.gds-header--dialog) {
      background: $color-background-surface;
      border-bottom: 1px solid $color-background-border;
      color: $color-content-primary;
    }

    .back {
      font-size: 20px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .title {
      flex: 1;
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `],
  host: {
    '[class.gds-header--ground]': 'variant() === "ground"',
    '[class.gds-header--nav]': 'variant() === "navigation-menu" || variant() === "nav"',
    '[class.gds-header--dialog]': 'variant() === "flow-dialog" || variant() === "bottom-sheet" || variant() === "dialog"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsHeaderComponent {
  readonly variant = input<'ground' | 'navigation-menu' | 'nav' | 'flow-dialog' | 'bottom-sheet' | 'back-button' | 'dialog'>('nav');
  readonly title = input('');
  readonly showBack = input(false);

  readonly backClick = output<void>();
}

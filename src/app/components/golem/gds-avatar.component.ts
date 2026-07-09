import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'gds-avatar',
  standalone: true,
  template: `
    @if (iconName()) {
      <span class="icon">{{ iconName() }}</span>
    } @else {
      <span class="initials">{{ initials() }}</span>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 16px;
      font-weight: $font-weight-semibold;
      flex-shrink: 0;
      background: $color-background-surface-tertiary;
      color: $color-content-secondary;
      font-family: $font-family-base;
    }

    :host(.gds-avatar--success) {
      background: $color-attention-success-surface;
      color: $color-attention-success;
    }

    :host(.gds-avatar--error) {
      background: $color-attention-alert-surface;
      color: $color-attention-alert;
    }

    :host(.gds-avatar--processing) {
      background: $color-attention-processing-surface;
      color: $color-attention-processing;
    }

    :host(.gds-avatar--primary) {
      background: $color-interactive-primary;
      color: $color-interactive-on-primary;
    }

    :host(.gds-avatar--sm) {
      width: 32px;
      height: 32px;
      font-size: 13px;
    }

    :host(.gds-avatar--lg) {
      width: 56px;
      height: 56px;
      font-size: 22px;
    }
  `],
  host: {
    '[class.gds-avatar--success]': 'variant() === "success"',
    '[class.gds-avatar--error]': 'variant() === "error"',
    '[class.gds-avatar--processing]': 'variant() === "processing"',
    '[class.gds-avatar--primary]': 'variant() === "primary"',
    '[class.gds-avatar--sm]': 'size() === "sm"',
    '[class.gds-avatar--lg]': 'size() === "lg"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsAvatarComponent {
  readonly iconName = input('');
  readonly initials = input('');
  readonly variant = input<'default' | 'success' | 'error' | 'processing' | 'primary'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

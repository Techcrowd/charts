import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'gds-item-navigation',
  standalone: true,
  template: `
    <div class="icon-slot">
      <ng-content select="[slot=icon]" />
      @if (!hasIconSlot()) {
        <span class="default-icon">&#9679;</span>
      }
    </div>
    <div class="content">
      <span class="label">{{ label() }}</span>
      @if (caption()) {
        <span class="caption">{{ caption() }}</span>
      }
      @if (message()) {
        <span
          class="message"
          [class.message--success]="messageType() === 'success'"
          [class.message--error]="messageType() === 'error'"
          [class.message--warning]="messageType() === 'warning'"
          [class.message--info]="messageType() === 'info'"
        >{{ message() }}</span>
      }
    </div>
    <span class="chevron">&#8250;</span>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: $color-background-surface;
      border-bottom: 1px solid $color-background-surface-secondary;
      cursor: pointer;
      font-family: $font-family-base;
    }

    .icon-slot {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-content-secondary;
      font-size: 18px;
      flex-shrink: 0;
    }

    .default-icon {
      font-size: 8px;
      color: $color-content-tertiary;
    }

    .content {
      flex: 1;
      min-width: 0;
    }

    .label {
      display: block;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      color: $color-content-primary;
    }

    .caption {
      display: block;
      font-size: $font-size-sm;
      color: $color-content-tertiary;
      margin-top: 2px;
    }

    .message {
      display: inline-block;
      font-size: $font-size-xs;
      margin-top: 4px;
      padding: 2px 8px;
      border-radius: $border-radius-md;

      &--success {
        background: $color-attention-success-surface;
        color: $color-attention-success;
      }

      &--error {
        background: $color-attention-alert-surface;
        color: $color-attention-alert;
      }

      &--warning {
        background: $color-attention-processing-surface;
        color: $color-attention-processing;
      }

      &--info {
        background: $color-attention-information-surface;
        color: $color-attention-information;
      }
    }

    .chevron {
      color: $color-content-quaternary;
      font-size: 14px;
      flex-shrink: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsItemNavigationComponent {
  readonly label = input('');
  readonly caption = input('');
  readonly message = input('');
  readonly messageType = input<'success' | 'error' | 'warning' | 'info'>('info');
  readonly screenReaderText = input('');

  hasIconSlot(): boolean {
    return false; // Content projection - icon will come through ng-content
  }
}

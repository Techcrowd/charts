import { Component, ChangeDetectionStrategy, input } from '@angular/core';

const TYPE_ICONS: Record<string, string> = {
  info: '\u24D8',      // circled i
  success: '\u2713',   // check
  error: '\u26A0',     // warning
  warning: '\u26A0',   // warning
};

@Component({
  selector: 'gds-inline-message',
  standalone: true,
  template: `
    <span class="icon">{{ typeIcon() }}</span>
    <span class="text">{{ message() }}</span>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 16px;
      border-radius: $border-radius-lg;
      font-size: $font-size-sm;
      font-family: $font-family-base;
    }

    :host(.gds-msg--info) {
      background: $color-attention-information-surface;
      color: $color-attention-information;
    }

    :host(.gds-msg--success) {
      background: $color-attention-success-surface;
      color: $color-attention-success;
    }

    :host(.gds-msg--error) {
      background: $color-attention-alert-surface;
      color: $color-attention-alert;
    }

    :host(.gds-msg--warning) {
      background: $color-attention-processing-surface;
      color: $color-attention-processing;
    }

    .icon {
      font-size: 18px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .text {
      flex: 1;
      line-height: $line-height-relaxed;
    }
  `],
  host: {
    'role': 'alert',
    '[class.gds-msg--info]': 'type() === "info"',
    '[class.gds-msg--success]': 'type() === "success"',
    '[class.gds-msg--error]': 'type() === "error"',
    '[class.gds-msg--warning]': 'type() === "warning"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsInlineMessageComponent {
  readonly type = input<'info' | 'success' | 'error' | 'warning'>('info');
  readonly message = input('');

  typeIcon(): string {
    return TYPE_ICONS[this.type()] ?? '';
  }
}

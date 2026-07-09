import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

const TYPE_ICONS: Record<string, string> = {
  success: '\u2713',
  error: '\u2717',
  info: '\u24D8',
  processing: '\u231B',
};

@Component({
  selector: 'gds-snackbar',
  standalone: true,
  template: `
    <span class="icon">{{ typeIcon() }}</span>
    <span class="text">{{ message() }}</span>
    @if (actionLabel()) {
      <span class="action" (click)="actionClick.emit()">{{ actionLabel() }}</span>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: $border-radius-lg;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      font-family: $font-family-base;
    }

    :host(.gds-snack--success) {
      background: $color-attention-success;
      color: #fff;
    }

    :host(.gds-snack--error) {
      background: $color-attention-alert;
      color: #fff;
    }

    :host(.gds-snack--info) {
      background: $color-content-secondary;
      color: #fff;
    }

    :host(.gds-snack--processing) {
      background: $color-attention-processing;
      color: #fff;
    }

    .icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .text {
      flex: 1;
    }

    .action {
      font-weight: $font-weight-bold;
      text-decoration: underline;
      cursor: pointer;
      white-space: nowrap;
    }
  `],
  host: {
    'role': 'status',
    '[class.gds-snack--success]': 'type() === "success"',
    '[class.gds-snack--error]': 'type() === "error"',
    '[class.gds-snack--info]': 'type() === "info"',
    '[class.gds-snack--processing]': 'type() === "processing"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsSnackbarComponent {
  readonly type = input<'success' | 'error' | 'info' | 'processing'>('info');
  readonly message = input('');
  readonly actionLabel = input('');
  readonly actionClick = output<void>();

  typeIcon(): string {
    return TYPE_ICONS[this.type()] ?? '';
  }
}

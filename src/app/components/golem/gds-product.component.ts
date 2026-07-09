import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'gds-product',
  standalone: true,
  template: `
    <span class="name">{{ name() }}</span>
    @if (value()) {
      <div class="value-row">
        <span class="value">{{ value() }}</span>
        @if (currency()) {
          <span class="currency">{{ currency() }}</span>
        }
      </div>
    }
    @if (caption()) {
      <span class="caption">{{ caption() }}</span>
    }
    @if (number()) {
      <span class="number">{{ number() }}</span>
    }
    @if (investmentPerformance()) {
      <div class="performance-row">
        @if (investmentCaption()) {
          <span class="perf-caption">{{ investmentCaption() }}</span>
        }
        <span class="performance" [class.performance--positive]="isPositive()">
          {{ investmentPerformance() }}
        </span>
        @if (investmentPeriod()) {
          <span class="perf-period">{{ investmentPeriod() }}</span>
        }
      </div>
    }
    @if (message()) {
      <div class="message" [class.message--success]="messageType() === 'success'" [class.message--info]="messageType() === 'info'">
        {{ message() }}
      </div>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      background: $color-background-surface;
      border-radius: $border-radius-lg;
      box-shadow: 0 1px 2px $shadow-panel-top, 0 2px 8px $shadow-panel-middle;
      cursor: pointer;
      font-family: $font-family-base;
    }

    :host(.gds-product--investment) {
      border-top: 3px solid $chart-evaluation;
    }

    :host(.gds-product--savings) {
      border-top: 3px solid $color-attention-success;
    }

    :host(.gds-product--loan) {
      border-top: 3px solid $color-attention-processing;
    }

    :host(.gds-product--insurance) {
      border-top: 3px solid $chart-cool;
    }

    .name {
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      color: $color-content-secondary;
    }

    .value-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value {
      font-size: $font-size-3xl;
      font-weight: $font-weight-bold;
      color: $color-content-primary;
      font-variant-numeric: tabular-nums;
    }

    .currency {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      color: $color-content-tertiary;
    }

    .caption {
      font-size: $font-size-sm;
      color: $color-content-tertiary;
    }

    .number {
      font-size: $font-size-sm;
      color: $color-content-tertiary;
      font-variant-numeric: tabular-nums;
    }

    .performance-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .perf-caption {
      font-size: $font-size-xs;
      color: $color-content-tertiary;
    }

    .performance {
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      color: $color-attention-alert;

      &--positive {
        color: $color-attention-success;
      }
    }

    .perf-period {
      font-size: $font-size-xs;
      color: $color-content-tertiary;
    }

    .message {
      font-size: $font-size-xs;
      padding: 6px 10px;
      border-radius: $border-radius-md;
      margin-top: 4px;

      &--info {
        background: $color-attention-information-surface;
        color: $color-attention-information;
      }

      &--success {
        background: $color-attention-success-surface;
        color: $color-attention-success;
      }
    }
  `],
  host: {
    '[class.gds-product--investment]': 'variant() === "investment" || variant() === "investment external"',
    '[class.gds-product--savings]': 'variant() === "savings"',
    '[class.gds-product--loan]': 'variant() === "loan"',
    '[class.gds-product--insurance]': 'variant() === "insurance"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsProductComponent {
  readonly variant = input('primary');
  readonly name = input('');
  readonly value = input('');
  readonly currency = input('');
  readonly number = input('');
  readonly caption = input('');
  readonly overdraft = input('');
  readonly message = input('');
  readonly messageType = input<'info' | 'success' | 'error' | 'warning'>('info');
  readonly investmentCaption = input('');
  readonly investmentPerformance = input('');
  readonly investmentPeriod = input('');
  readonly enabled = input(true);

  readonly productClick = output<void>();

  isPositive(): boolean {
    return this.investmentPerformance().startsWith('+');
  }
}

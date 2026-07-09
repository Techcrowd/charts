import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsSpinnerComponent } from '../../../components/golem';

@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [GdsSpinnerComponent],
  template: `
    <div class="demo-row">
      <div class="demo-item">
        <div class="demo-label">Small</div>
        <gds-spinner size="sm" />
      </div>
      <div class="demo-item">
        <div class="demo-label">Medium (default)</div>
        <gds-spinner />
      </div>
      <div class="demo-item">
        <div class="demo-label">Large</div>
        <gds-spinner size="lg" />
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      padding: 20px;
      background: $color-background-surface-secondary;
      border-radius: $border-radius-lg;
    }

    .demo-row {
      display: flex;
      align-items: flex-end;
      gap: 32px;
    }

    .demo-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .demo-label {
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
      color: $color-content-tertiary;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerDemoComponent {}

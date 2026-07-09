import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { GdsCheckboxComponent } from '../../../components/golem';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [GdsCheckboxComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Interactive checkboxes</div>
      <div class="demo-card">
        <gds-checkbox label="Accept terms and conditions" [(checked)]="terms" />
        <gds-checkbox label="Subscribe to newsletter" [(checked)]="newsletter" />
        <gds-checkbox label="Remember me" [(checked)]="remember" />
      </div>
      <span class="demo-output">
        Terms: {{ terms() }}, Newsletter: {{ newsletter() }}, Remember: {{ remember() }}
      </span>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      background: $color-background-surface-secondary;
      border-radius: $border-radius-lg;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .demo-label {
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
      color: $color-content-tertiary;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .demo-card {
      background: $color-background-surface;
      border-radius: $border-radius-lg;
      padding: 0 16px;
    }

    .demo-output {
      font-size: $font-size-sm;
      color: $color-content-secondary;
      font-family: $font-family-mono;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDemoComponent {
  readonly terms = signal(false);
  readonly newsletter = signal(true);
  readonly remember = signal(false);
}

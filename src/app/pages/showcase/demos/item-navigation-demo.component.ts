import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsItemNavigationComponent } from '../../../components/golem';

@Component({
  selector: 'app-item-navigation-demo',
  standalone: true,
  imports: [GdsItemNavigationComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Success message type</div>
      <div class="demo-card">
        <gds-item-navigation label="$label" caption="$caption" message="$message" messageType="success" />
        <gds-item-navigation label="-2 000 CZK" caption="$caption" message="$message" messageType="success" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">Error message type</div>
      <div class="demo-card">
        <gds-item-navigation label="$label" caption="$caption" message="$message" messageType="error" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">Warning / Info</div>
      <div class="demo-card">
        <gds-item-navigation label="$label" caption="$caption" message="$message" messageType="warning" />
        <gds-item-navigation label="$label" caption="$caption" message="$message" messageType="info" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">Without message</div>
      <div class="demo-card">
        <gds-item-navigation label="Account settings" caption="Manage your preferences" />
        <gds-item-navigation label="Security" caption="Password and authentication" />
        <gds-item-navigation label="Help & Support" />
      </div>
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
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemNavigationDemoComponent {}

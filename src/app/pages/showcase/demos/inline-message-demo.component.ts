import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsInlineMessageComponent } from '../../../components/golem';

@Component({
  selector: 'app-inline-message-demo',
  standalone: true,
  imports: [GdsInlineMessageComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Info</div>
      <gds-inline-message type="info" message="This is an informational message." />
    </div>

    <div class="demo-section">
      <div class="demo-label">Success</div>
      <gds-inline-message type="success" message="Operation completed successfully." />
    </div>

    <div class="demo-section">
      <div class="demo-label">Error</div>
      <gds-inline-message type="error" message="Something went wrong. Please try again." />
    </div>

    <div class="demo-section">
      <div class="demo-label">Warning</div>
      <gds-inline-message type="warning" message="Your session is about to expire." />
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineMessageDemoComponent {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsSnackbarComponent } from '../../../components/golem';

@Component({
  selector: 'app-snackbar-demo',
  standalone: true,
  imports: [GdsSnackbarComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Success</div>
      <gds-snackbar type="success" message="Operation successful" actionLabel="Undo" />
    </div>

    <div class="demo-section">
      <div class="demo-label">Error</div>
      <gds-snackbar type="error" message="Something went wrong" actionLabel="Retry" />
    </div>

    <div class="demo-section">
      <div class="demo-label">Info</div>
      <gds-snackbar type="info" message="New updates available" />
    </div>

    <div class="demo-section">
      <div class="demo-label">Processing</div>
      <gds-snackbar type="processing" message="Processing your request..." />
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
export class SnackbarDemoComponent {}

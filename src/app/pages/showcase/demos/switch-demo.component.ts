import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { GdsSwitchComponent } from '../../../components/golem';

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [GdsSwitchComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Interactive switches</div>
      <div class="demo-card">
        <gds-switch label="Notifications" caption="Push notifications" [(checked)]="notif" />
        <gds-switch label="Dark mode" [(checked)]="darkMode" />
        <gds-switch label="Auto-sync" caption="Sync data every 5 minutes" [(checked)]="autoSync" />
      </div>
      <span class="demo-output">
        Notifications: {{ notif() }}, Dark mode: {{ darkMode() }}, Auto-sync: {{ autoSync() }}
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
export class SwitchDemoComponent {
  readonly notif = signal(true);
  readonly darkMode = signal(false);
  readonly autoSync = signal(true);
}

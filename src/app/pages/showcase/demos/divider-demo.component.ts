import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsDividerComponent } from '../../../components/golem';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [GdsDividerComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Standard divider</div>
      <div class="demo-card">
        <span>Content above</span>
        <gds-divider />
        <span>Content below</span>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">Thick divider (section separator)</div>
      <div class="demo-card">
        <span>Section 1</span>
        <gds-divider [thick]="true" />
        <span>Section 2</span>
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
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px;
      background: $color-background-surface;
      border-radius: $border-radius-lg;
      font-size: $font-size-md;
      color: $color-content-secondary;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {}

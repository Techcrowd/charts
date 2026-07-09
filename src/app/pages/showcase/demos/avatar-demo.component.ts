import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsAvatarComponent } from '../../../components/golem';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [GdsAvatarComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Sizes</div>
      <div class="demo-row">
        <gds-avatar initials="SM" size="sm" />
        <gds-avatar initials="MD" />
        <gds-avatar initials="LG" size="lg" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">Variants</div>
      <div class="demo-row">
        <gds-avatar initials="DF" />
        <gds-avatar initials="OK" variant="success" />
        <gds-avatar initials="ER" variant="error" />
        <gds-avatar initials="PR" variant="processing" />
        <gds-avatar initials="TC" variant="primary" />
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-label">With icon</div>
      <div class="demo-row">
        <gds-avatar iconName="&#9733;" />
        <gds-avatar iconName="&#9825;" variant="primary" />
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

    .demo-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {}

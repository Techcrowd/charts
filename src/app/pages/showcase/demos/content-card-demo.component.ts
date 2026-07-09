import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsContentCardComponent } from '../../../components/golem';

@Component({
  selector: 'app-content-card-demo',
  standalone: true,
  imports: [GdsContentCardComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Primary card</div>
      <gds-content-card variant="card-primary">
        <h3>Primary Card</h3>
        <p>Primary Card content line 1</p>
        <p>Primary Card content line 2</p>
      </gds-content-card>
    </div>

    <div class="demo-section">
      <div class="demo-label">Secondary card</div>
      <gds-content-card variant="card-secondary">
        <h3>Secondary Card</h3>
        <p>Secondary Card content line 1</p>
        <p>Secondary Card content line 2</p>
      </gds-content-card>
    </div>

    <div class="demo-section">
      <div class="demo-label">Highlight card</div>
      <gds-content-card variant="card-highlight">
        <h3>Highlight Card</h3>
        <p>Highlight Card content line 1</p>
        <p>Highlight Card content line 2</p>
      </gds-content-card>
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
export class ContentCardDemoComponent {}

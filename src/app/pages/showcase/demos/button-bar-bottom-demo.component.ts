import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsButtonComponent, GdsButtonBarBottomComponent } from '../../../components/golem';

@Component({
  selector: 'app-button-bar-bottom-demo',
  standalone: true,
  imports: [GdsButtonComponent, GdsButtonBarBottomComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">One button</div>
      <gds-button-bar-bottom>
        <button gds-button variant="button-primary" label="$label"></button>
      </gds-button-bar-bottom>
    </div>

    <div class="demo-section">
      <div class="demo-label">One button - secondary</div>
      <gds-button-bar-bottom>
        <button gds-button variant="button-secondary" label="$label"></button>
      </gds-button-bar-bottom>
    </div>

    <div class="demo-section">
      <div class="demo-label">Two buttons</div>
      <gds-button-bar-bottom>
        <button gds-button variant="button-primary" label="$label"></button>
        <button gds-button variant="button-secondary" label="$label"></button>
      </gds-button-bar-bottom>
    </div>

    <div class="demo-section">
      <div class="demo-label">Two buttons - primary and tertiary</div>
      <gds-button-bar-bottom>
        <button gds-button variant="button-primary" label="$label"></button>
        <button gds-button variant="button-tertiary" label="$label"></button>
      </gds-button-bar-bottom>
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
export class ButtonBarBottomDemoComponent {}

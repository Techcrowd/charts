import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { GdsButtonComponent } from '../../../components/golem';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [GdsButtonComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Primary - full width</div>
      <button gds-button variant="button-primary" label="$label" width="full-width"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Primary - inline</div>
      <button gds-button variant="button-primary" label="$label"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Primary - with icon</div>
      <button gds-button variant="button-primary" label="$label" width="full-width">
        <span style="margin-right:4px">&#8962;</span>
      </button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Disabled</div>
      <button gds-button variant="button-primary" label="$label" width="full-width" [disabled]="true">
        <span style="margin-right:4px">&#8962;</span>
      </button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Secondary - full width</div>
      <button gds-button variant="button-secondary" label="$label" width="full-width"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Secondary - inline</div>
      <button gds-button variant="button-secondary" label="$label"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Tertiary - full width</div>
      <button gds-button variant="button-tertiary" label="$label" width="full-width"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Tertiary - inline</div>
      <button gds-button variant="button-tertiary" label="$label"></button>
    </div>

    <div class="demo-section">
      <div class="demo-label">Interactive test</div>
      <div class="demo-row">
        <button gds-button variant="button-primary" label="Click me" (click)="clickCount.set(clickCount() + 1)"></button>
        <span class="demo-counter">Clicked: {{ clickCount() }}x</span>
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

    .demo-counter {
      font-size: $font-size-sm;
      color: $color-content-secondary;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {
  readonly clickCount = signal(0);
}

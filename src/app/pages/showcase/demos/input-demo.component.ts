import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { GdsInputComponent } from '../../../components/golem';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [GdsInputComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Basic</div>
      <gds-input
        label="Popisek"
        placeholder="placeholder"
        hint="Info message"
        inputId="basic-demo"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">Basic with placeholder</div>
      <gds-input
        label="Basic"
        placeholder="placeholder"
        hint="Info message"
        inputId="placeholder-demo"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">Error state</div>
      <gds-input
        label="Error"
        error="Error message"
        inputId="error-demo"
        [(value)]="errorValue"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">Disabled</div>
      <gds-input
        label="Disabled"
        [disabled]="true"
        value="Disabled value"
        inputId="disabled-demo"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">Mega input</div>
      <gds-input
        variant="mega"
        label="Amount"
        placeholder="0.00"
        inputId="mega-demo"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">Interactive test</div>
      <gds-input
        label="Type something"
        placeholder="Start typing..."
        inputId="interactive-demo"
        [(value)]="typedValue"
      />
      <span class="demo-output">Value: "{{ typedValue() }}"</span>
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

    .demo-output {
      font-size: $font-size-sm;
      color: $color-content-secondary;
      font-family: $font-family-mono;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  readonly errorValue = signal('Invalid input');
  readonly typedValue = signal('');
}

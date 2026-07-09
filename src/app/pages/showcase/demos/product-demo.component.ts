import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsProductComponent } from '../../../components/golem';

@Component({
  selector: 'app-product-demo',
  standalone: true,
  imports: [GdsProductComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">variant: primary</div>
      <gds-product
        variant="primary"
        name="$name"
        value="125 430"
        currency="CZK"
        number="123-4567890/0100"
        message="$message"
        messageType="success"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: current account</div>
      <gds-product
        variant="current account"
        name="$name"
        value="125 430"
        currency="CZK"
        number="123-4567890/0100"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: savings</div>
      <gds-product
        variant="savings"
        name="$name"
        value="50 000"
        currency="CZK"
        number="987-6543210/0300"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: investment</div>
      <gds-product
        variant="investment"
        name="$name"
        value="50 000"
        currency="CZK"
        investmentCaption="Yield"
        investmentPerformance="+5.2%"
        investmentPeriod="1Y"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: insurance</div>
      <gds-product
        variant="insurance"
        name="$name"
        caption="$caption"
        message="$message"
        messageType="info"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: loan</div>
      <gds-product
        variant="loan"
        name="$name"
        caption="$caption"
        message="$message"
        messageType="info"
      />
    </div>

    <div class="demo-section">
      <div class="demo-label">variant: envelope</div>
      <gds-product
        variant="envelope"
        name="$name"
        value="10 000"
        currency="CZK"
      />
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
export class ProductDemoComponent {}

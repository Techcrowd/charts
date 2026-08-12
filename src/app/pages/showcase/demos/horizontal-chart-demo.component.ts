import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CoHorizontalChartComponent,
  HorizontalAccountItem,
  HorizontalSavingsData,
  HorizontalInvestmentsSection,
} from '../../../components/co-horizontal-chart/co-horizontal-chart.component';

@Component({
  selector: 'app-horizontal-chart-demo',
  standalone: true,
  imports: [CoHorizontalChartComponent],
  template: `
    <div class="demo-col">
      <div class="demo-item">
        <div class="demo-label">HorizontalAccount</div>
        <co-horizontal-chart variant="account" [accountItems]="accountItems" [valueUnit]="'Kč'" />
      </div>
      <div class="demo-item">
        <div class="demo-label">HorizontalSavings</div>
        <co-horizontal-chart variant="savings" [savingsData]="savingsData" [valueUnit]="'Kč'" [compactValues]="true" />
      </div>
      <div class="demo-item">
        <div class="demo-label">HorizontalInvestments</div>
        <co-horizontal-chart variant="investments" [sections]="sections" />
      </div>
      <div class="demo-item">
        <div class="demo-label">Loading</div>
        <co-horizontal-chart variant="account" [loading]="true" [skeletonRowCount]="1" />
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      padding: 20px;
      background: $color-background-surface-secondary;
      border-radius: $border-radius-lg;
    }

    .demo-col {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .demo-item {
      display: flex;
      flex-direction: column;
      gap: 12px;
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
export class HorizontalChartDemoComponent {
  accountItems: HorizontalAccountItem[] = [
    { label: 'Odchozí platby', value: 42350, direction: 'out' },
    { label: 'Příchozí platby', value: 78500, direction: 'in' },
  ];

  savingsData: HorizontalSavingsData = {
    label: 'Naspořeno',
    value: 125000,
    maxLabel: 'Cíl',
    maxValue: 300000,
  };

  sections: HorizontalInvestmentsSection[] = [
    { name: 'Akcie', value: 1215211 },
    { name: 'Fondy', value: 845000 },
    { name: 'Dluhopisy', value: 620500 },
    { name: 'Hotovost', value: 410000 },
  ];
}

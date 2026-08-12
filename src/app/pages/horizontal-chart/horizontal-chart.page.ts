import { Component } from '@angular/core';
import {
  CoHorizontalChartComponent,
  HorizontalAccountItem,
  HorizontalSavingsData,
  HorizontalInvestmentsSection,
} from '../../components/co-horizontal-chart/co-horizontal-chart.component';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-horizontal-chart-page',
  standalone: true,
  imports: [CoHorizontalChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './horizontal-chart.page.html',
})
export class HorizontalChartPage {
  // ============ ACCOUNT ============

  accountItems: HorizontalAccountItem[] = [
    { label: 'Odchozí platby', value: 42350, direction: 'out' },
    { label: 'Příchozí platby', value: 78500, direction: 'in' },
  ];

  // ============ SAVINGS ============

  savingsData: HorizontalSavingsData = {
    label: 'Naspořeno',
    value: 125000,
    maxLabel: 'Cíl',
    maxValue: 300000,
  };

  savingsAlmostDone: HorizontalSavingsData = {
    label: 'Naspořeno',
    value: 287500,
    maxLabel: 'Cíl',
    maxValue: 300000,
  };

  // ============ INVESTMENTS ============

  investmentsThree: HorizontalInvestmentsSection[] = [
    { name: 'Akcie', value: 1215211 },
    { name: 'Fondy', value: 845000 },
    { name: 'Dluhopisy', value: 620500 },
  ];

  investmentsFour: HorizontalInvestmentsSection[] = [
    { name: 'Akcie', value: 450 },
    { name: 'Fondy', value: 320 },
    { name: 'Dluhopisy', value: 280 },
    { name: 'Hotovost', value: 210 },
  ];

  investmentsFive: HorizontalInvestmentsSection[] = [
    { name: 'Akcie', value: 450 },
    { name: 'Fondy', value: 320 },
    { name: 'Dluhopisy', value: 280 },
    { name: 'Hotovost', value: 150 },
    { name: 'Komodity', value: 95 },
  ];

  // ============ CODE EXAMPLES ============

  code = {
    account: `<co-horizontal-chart variant="account" [accountItems]="items" [valueUnit]="'Kč'" />`,
    accountTs: `items: HorizontalAccountItem[] = [
  { label: 'Odchozí platby', value: 42350, direction: 'out' },
  { label: 'Příchozí platby', value: 78500, direction: 'in' },
];`,
    savings: `<co-horizontal-chart variant="savings" [savingsData]="savings" [valueUnit]="'Kč'" [compactValues]="true" />`,
    savingsTs: `savings: HorizontalSavingsData = {
  label: 'Naspořeno',
  value: 125000,
  maxLabel: 'Cíl',
  maxValue: 300000,
};`,
    investments: `<co-horizontal-chart variant="investments" [sections]="sections" />`,
    investmentsTs: `sections: HorizontalInvestmentsSection[] = [
  { name: 'Akcie', value: 1215211 },
  { name: 'Fondy', value: 845000 },
  { name: 'Dluhopisy', value: 620500 },
];`,
    investmentsColors: `<co-horizontal-chart
  variant="investments"
  [sections]="sections"
  [colors]="['chart-evaluation', 'chart-stocks', 'chart-bonds', 'chart-funds', 'chart-neon']"
/>`,
    loading: `<co-horizontal-chart variant="account" [loading]="true" [skeletonRowCount]="2" />`,
  };
}

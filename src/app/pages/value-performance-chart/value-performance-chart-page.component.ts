import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoValuePerformanceChartComponent,
  ValuePerformanceData,
} from '../../components/co-value-performance-chart/co-value-performance-chart.component';

// ============ HELPER FUNCTIONS ============

/** Generate mock data for 1 year */
function generateMockData(): ValuePerformanceData {
  const now = new Date();
  const points: { timestamp: Date; value: number; invested?: number }[] = [];
  const startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const pointCount = 120;
  const intervalMs = (365 * 24 * 60 * 60 * 1000) / 120;

  // Generate random walk data
  let value = 10000 + Math.random() * 5000;
  let invested = 8000;

  for (let i = 0; i < pointCount; i++) {
    const timestamp = new Date(startDate.getTime() + i * intervalMs);

    // Random walk for value
    const change = (Math.random() - 0.48) * value * 0.03;
    value = Math.max(value + change, 1000);

    // Gradual increase for invested (occasional deposits)
    if (Math.random() > 0.95) {
      invested += Math.random() * 1000;
    }

    points.push({
      timestamp,
      value: Math.round(value * 100) / 100,
      invested: Math.round(invested * 100) / 100,
    });
  }

  return { points };
}

/** Generate positive trend data */
function generatePositiveTrendData(): ValuePerformanceData {
  const points: { timestamp: Date; value: number; invested?: number }[] = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const pointCount = 100;
  const intervalMs = (365 * 24 * 60 * 60 * 1000) / pointCount;

  let value = 10000;
  let invested = 10000;

  for (let i = 0; i < pointCount; i++) {
    const timestamp = new Date(startDate.getTime() + i * intervalMs);

    // Upward trend with noise
    const trend = (i / pointCount) * 8000;
    const noise = (Math.random() - 0.5) * 2000;
    value = 10000 + trend + noise;

    points.push({
      timestamp,
      value: Math.round(value * 100) / 100,
      invested,
    });
  }

  return { points };
}

/** Generate negative trend data */
function generateNegativeTrendData(): ValuePerformanceData {
  const points: { timestamp: Date; value: number; invested?: number }[] = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const pointCount = 100;
  const intervalMs = (365 * 24 * 60 * 60 * 1000) / pointCount;

  let value = 15000;
  let invested = 10000;

  for (let i = 0; i < pointCount; i++) {
    const timestamp = new Date(startDate.getTime() + i * intervalMs);

    // Downward trend with noise
    const trend = (i / pointCount) * -5000;
    const noise = (Math.random() - 0.5) * 1500;
    value = 15000 + trend + noise;

    points.push({
      timestamp,
      value: Math.max(Math.round(value * 100) / 100, 5000),
      invested,
    });
  }

  return { points };
}

// ============ COMPONENT ============

@Component({
  selector: 'app-value-performance-chart-page',
  standalone: true,
  imports: [CommonModule, CoValuePerformanceChartComponent],
  templateUrl: './value-performance-chart-page.component.html',
  styleUrls: ['./value-performance-chart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePerformanceChartPageComponent {
  // ============ DATA ============

  // Basic demo data
  basicData = generateMockData();

  // Positive trend data
  positiveTrendData = generatePositiveTrendData();

  // Negative trend data
  negativeTrendData = generateNegativeTrendData();

  // Loading state
  isLoading = true;

  // Event log
  lastEvent = '';

  // ============ CODE EXAMPLES ============

  basicExample = `<co-value-performance-chart
  [data]="chartData"
  [height]="300"
  [showLegend]="true"
  [showTooltip]="true"
  [valueUnit]="'USD'"
/>`;

  positiveTrendExample = `<co-value-performance-chart
  [data]="positiveData"
  [trend]="'positive'"
  [positiveColor]="'chart-in'"
/>`;

  negativeTrendExample = `<co-value-performance-chart
  [data]="negativeData"
  [trend]="'negative'"
  [negativeColor]="'chart-out'"
/>`;

  withInvestedExample = `<co-value-performance-chart
  [data]="chartData"
  [showInvestedLine]="true"
  [investedColor]="'chart-bonds'"
/>`;

  minimalExample = `<co-value-performance-chart
  [data]="chartData"
  [showLegend]="false"
  [showHighLowValues]="false"
  [showClosingValue]="false"
/>`;

  dataTypeExample = `interface ValuePerformanceDataPoint {
  timestamp: Date | number | string;
  value: number;
  invested?: number;
}

interface ValuePerformanceData {
  points: ValuePerformanceDataPoint[];
  highValue?: number;
  lowValue?: number;
  closingValue?: number;
}`;

  // ============ METHODS ============

  constructor() {
    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onPointHover(event: any): void {
    if (event) {
      this.lastEvent = `Hover: ${new Date(event.timestamp).toLocaleDateString('cs-CZ')} - hodnota: ${event.value.toLocaleString('cs-CZ')}`;
    }
  }

  onPointClick(event: any): void {
    this.lastEvent = `Klik: ${new Date(event.timestamp).toLocaleDateString('cs-CZ')} - hodnota: ${event.value.toLocaleString('cs-CZ')}`;
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }
}

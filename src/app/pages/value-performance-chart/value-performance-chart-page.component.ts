import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoValuePerformanceChartComponent,
  ValuePerformanceData,
  TimeInterval,
} from '../../components/co-value-performance-chart/co-value-performance-chart.component';

// ============ HELPER FUNCTIONS ============

/** Generate mock data for a given time interval */
function generateMockData(interval: TimeInterval): ValuePerformanceData {
  const now = new Date();
  const points: { timestamp: Date; value: number; invested?: number }[] = [];

  let startDate: Date;
  let pointCount: number;
  let intervalMs: number;

  switch (interval) {
    case '1D':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      pointCount = 120; // Every 12 minutes
      intervalMs = 12 * 60 * 1000;
      break;
    case '5D':
      startDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
      pointCount = 100;
      intervalMs = (5 * 24 * 60 * 60 * 1000) / 100;
      break;
    case '1M':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      pointCount = 60;
      intervalMs = (30 * 24 * 60 * 60 * 1000) / 60;
      break;
    case '6M':
      startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      pointCount = 90;
      intervalMs = (180 * 24 * 60 * 60 * 1000) / 90;
      break;
    case '1Y':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      pointCount = 120;
      intervalMs = (365 * 24 * 60 * 60 * 1000) / 120;
      break;
    case '5Y':
      startDate = new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
      pointCount = 150;
      intervalMs = (5 * 365 * 24 * 60 * 60 * 1000) / 150;
      break;
    case 'ALL':
    default:
      startDate = new Date(now.getTime() - 10 * 365 * 24 * 60 * 60 * 1000);
      pointCount = 200;
      intervalMs = (10 * 365 * 24 * 60 * 60 * 1000) / 200;
      break;
  }

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
  basicData = generateMockData('1Y');
  activeInterval: TimeInterval = '1Y';

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
  (timeIntervalChange)="onIntervalChange($event)"
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
  [showTimeIntervalSelector]="false"
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

  onIntervalChange(interval: TimeInterval): void {
    this.activeInterval = interval;
    this.basicData = generateMockData(interval);
    this.lastEvent = `Interval změněn na: ${interval}`;
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

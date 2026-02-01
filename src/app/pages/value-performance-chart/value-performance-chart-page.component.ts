import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoValuePerformanceChartComponent,
  ValuePerformanceData,
} from '../../components/co-value-performance-chart/co-value-performance-chart.component';

// ============ STATIC DATA ============

/** Basic data with invested line - stable growth */
const BASIC_DATA: ValuePerformanceData = {
  points: [
    { timestamp: '2025-01-01', value: 10000, invested: 10000 },
    { timestamp: '2025-01-15', value: 10250, invested: 10000 },
    { timestamp: '2025-02-01', value: 10180, invested: 10000 },
    { timestamp: '2025-02-15', value: 10520, invested: 10500 },
    { timestamp: '2025-03-01', value: 10890, invested: 10500 },
    { timestamp: '2025-03-15', value: 10750, invested: 10500 },
    { timestamp: '2025-04-01', value: 11200, invested: 11000 },
    { timestamp: '2025-04-15', value: 11450, invested: 11000 },
    { timestamp: '2025-05-01', value: 11320, invested: 11000 },
    { timestamp: '2025-05-15', value: 11680, invested: 11500 },
    { timestamp: '2025-06-01', value: 12100, invested: 11500 },
    { timestamp: '2025-06-15', value: 11950, invested: 11500 },
    { timestamp: '2025-07-01', value: 12400, invested: 12000 },
    { timestamp: '2025-07-15', value: 12750, invested: 12000 },
    { timestamp: '2025-08-01', value: 12580, invested: 12000 },
    { timestamp: '2025-08-15', value: 12920, invested: 12500 },
    { timestamp: '2025-09-01', value: 13200, invested: 12500 },
    { timestamp: '2025-09-15', value: 13050, invested: 12500 },
    { timestamp: '2025-10-01', value: 13480, invested: 13000 },
    { timestamp: '2025-10-15', value: 13750, invested: 13000 },
    { timestamp: '2025-11-01', value: 13620, invested: 13000 },
    { timestamp: '2025-11-15', value: 14100, invested: 13500 },
    { timestamp: '2025-12-01', value: 14450, invested: 13500 },
    { timestamp: '2025-12-15', value: 14280, invested: 13500 },
  ],
};

/** Positive trend data */
const POSITIVE_TREND_DATA: ValuePerformanceData = {
  points: [
    { timestamp: '2025-01-01', value: 10000 },
    { timestamp: '2025-02-01', value: 10800 },
    { timestamp: '2025-03-01', value: 11200 },
    { timestamp: '2025-04-01', value: 12500 },
    { timestamp: '2025-05-01', value: 13100 },
    { timestamp: '2025-06-01', value: 14200 },
    { timestamp: '2025-07-01', value: 14800 },
    { timestamp: '2025-08-01', value: 15600 },
    { timestamp: '2025-09-01', value: 16400 },
    { timestamp: '2025-10-01', value: 17200 },
    { timestamp: '2025-11-01', value: 17800 },
    { timestamp: '2025-12-01', value: 18500 },
  ],
};

/** Negative trend data */
const NEGATIVE_TREND_DATA: ValuePerformanceData = {
  points: [
    { timestamp: '2025-01-01', value: 15000 },
    { timestamp: '2025-02-01', value: 14200 },
    { timestamp: '2025-03-01', value: 13800 },
    { timestamp: '2025-04-01', value: 12500 },
    { timestamp: '2025-05-01', value: 12100 },
    { timestamp: '2025-06-01', value: 11200 },
    { timestamp: '2025-07-01', value: 10800 },
    { timestamp: '2025-08-01', value: 10200 },
    { timestamp: '2025-09-01', value: 9600 },
    { timestamp: '2025-10-01', value: 9200 },
    { timestamp: '2025-11-01', value: 8800 },
    { timestamp: '2025-12-01', value: 8500 },
  ],
};

/** Volatile data with big swings */
const VOLATILE_DATA: ValuePerformanceData = {
  points: [
    { timestamp: '2025-01-01', value: 10000, invested: 10000 },
    { timestamp: '2025-01-15', value: 11500, invested: 10000 },
    { timestamp: '2025-02-01', value: 8500, invested: 10000 },
    { timestamp: '2025-02-15', value: 12000, invested: 10000 },
    { timestamp: '2025-03-01', value: 9000, invested: 10000 },
    { timestamp: '2025-03-15', value: 13500, invested: 10000 },
    { timestamp: '2025-04-01', value: 7500, invested: 10000 },
    { timestamp: '2025-04-15', value: 14000, invested: 10000 },
    { timestamp: '2025-05-01', value: 10500, invested: 10000 },
    { timestamp: '2025-05-15', value: 15500, invested: 10000 },
    { timestamp: '2025-06-01', value: 8000, invested: 10000 },
    { timestamp: '2025-06-15', value: 16000, invested: 10000 },
    { timestamp: '2025-07-01', value: 11000, invested: 10000 },
    { timestamp: '2025-07-15', value: 6500, invested: 10000 },
    { timestamp: '2025-08-01', value: 14500, invested: 10000 },
    { timestamp: '2025-08-15', value: 9500, invested: 10000 },
    { timestamp: '2025-09-01', value: 17000, invested: 10000 },
    { timestamp: '2025-09-15', value: 7000, invested: 10000 },
    { timestamp: '2025-10-01', value: 13000, invested: 10000 },
    { timestamp: '2025-10-15', value: 10000, invested: 10000 },
    { timestamp: '2025-11-01', value: 15000, invested: 10000 },
    { timestamp: '2025-11-15', value: 8500, invested: 10000 },
    { timestamp: '2025-12-01', value: 12500, invested: 10000 },
  ],
};

/** Stepline data - discrete value changes */
const STEPLINE_DATA: ValuePerformanceData = {
  points: [
    { timestamp: '2025-01-01', value: 10000, invested: 10000 },
    { timestamp: '2025-01-20', value: 10000, invested: 10000 },
    { timestamp: '2025-01-21', value: 10500, invested: 10000 },
    { timestamp: '2025-02-15', value: 10500, invested: 10000 },
    { timestamp: '2025-02-16', value: 11200, invested: 11000 },
    { timestamp: '2025-03-10', value: 11200, invested: 11000 },
    { timestamp: '2025-03-11', value: 10800, invested: 11000 },
    { timestamp: '2025-04-05', value: 10800, invested: 11000 },
    { timestamp: '2025-04-06', value: 12000, invested: 12000 },
    { timestamp: '2025-05-01', value: 12000, invested: 12000 },
    { timestamp: '2025-05-02', value: 12800, invested: 12000 },
    { timestamp: '2025-06-01', value: 12800, invested: 12000 },
    { timestamp: '2025-06-02', value: 11500, invested: 12000 },
    { timestamp: '2025-07-01', value: 11500, invested: 12000 },
    { timestamp: '2025-07-02', value: 13500, invested: 13000 },
    { timestamp: '2025-08-01', value: 13500, invested: 13000 },
    { timestamp: '2025-08-02', value: 14200, invested: 13000 },
    { timestamp: '2025-09-01', value: 14200, invested: 13000 },
    { timestamp: '2025-09-02', value: 13800, invested: 13000 },
    { timestamp: '2025-10-01', value: 13800, invested: 13000 },
    { timestamp: '2025-10-02', value: 15000, invested: 14000 },
    { timestamp: '2025-11-01', value: 15000, invested: 14000 },
    { timestamp: '2025-11-02', value: 15800, invested: 14000 },
    { timestamp: '2025-12-01', value: 15800, invested: 14000 },
  ],
};

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
  private cdr = inject(ChangeDetectorRef);

  // ============ STATIC DATA ============

  readonly basicData = BASIC_DATA;
  readonly positiveTrendData = POSITIVE_TREND_DATA;
  readonly negativeTrendData = NEGATIVE_TREND_DATA;
  readonly volatileData = VOLATILE_DATA;
  readonly steplineData = STEPLINE_DATA;

  // Loading state
  isLoading = true;

  // Hovered point data
  hoveredPoint: { timestamp: Date | number | string; value: number; invested?: number } | null = null;

  // Date format for the chart
  dateFormat = 'dd.MM.yyyy';

  // ============ CODE EXAMPLES ============

  basicExample = `<co-value-performance-chart
  [data]="chartData"
  [height]="300"
  [valueUnit]="'Kč'"
/>`;

  positiveTrendExample = `<co-value-performance-chart
  [data]="positiveData"
  [trend]="'positive'"
/>`;

  negativeTrendExample = `<co-value-performance-chart
  [data]="negativeData"
  [trend]="'negative'"
/>`;

  withInvestedExample = `<co-value-performance-chart
  [data]="chartData"
  [showInvestedLine]="true"
  [showLegend]="true"
/>`;

  steplineExample = `<co-value-performance-chart
  [data]="chartData"
  [curveType]="'stepline'"
  [showLegend]="true"
/>`;

  volatileExample = `<co-value-performance-chart
  [data]="volatileData"
  [showInvestedLine]="true"
  [showLegend]="true"
/>`;

  hoverExample = `<co-value-performance-chart
  [data]="chartData"
  [dateFormat]="'dd.MM.yyyy'"
  (pointHover)="onPointHover($event)"
/>

<!-- Zobrazení hodnot mimo komponentu -->
@if (hoveredPoint) {
  <div class="hover-values">
    <span>{{ formatDate(hoveredPoint.timestamp) }}</span>
    <span>{{ formatNumber(hoveredPoint.value) }}</span>
  </div>
}`;

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

  onPointHover(event: { timestamp: Date | number | string; value: number; invested?: number } | null): void {
    this.hoveredPoint = event;
    this.cdr.markForCheck();
  }

  formatNumber(value: number): string {
    return value.toLocaleString('cs-CZ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatDate(timestamp: Date | number | string): string {
    const date = new Date(timestamp);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return this.dateFormat
      .replace('yyyy', date.getFullYear().toString())
      .replace('MM', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('mm', pad(date.getMinutes()));
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  signal,
  computed,
  inject,
  SimpleChanges,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexLegend,
  ApexStates,
  ApexAnnotations,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { CoChartLegendComponent, ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
import { CHART_COLORS } from '../../shared/chart-types';

// ============ TYPES ============

export { ChartColor } from '../../services/chart-color.service';

/** Časový interval pro zobrazení dat */
export type TimeInterval = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL';

/** Trend grafu */
export type ChartTrend = 'positive' | 'negative' | 'auto';

/** Datový bod pro graf */
export interface ValuePerformanceDataPoint {
  timestamp: Date | number | string;
  value: number;
  invested?: number;
}

/** Data pro graf */
export interface ValuePerformanceData {
  points: ValuePerformanceDataPoint[];
  highValue?: number;
  lowValue?: number;
  closingValue?: number;
}

/** Statické konfigurace */
const STATES_CONFIG: ApexStates = {
  hover: { filter: { type: 'none' } },
  active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } },
};

const LEGEND_CONFIG: ApexLegend = { show: false };

// ============ COMPONENT ============

@Component({
  selector: 'co-value-performance-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-value-performance-chart.component.html',
  styleUrls: ['./co-value-performance-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoValuePerformanceChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: ValuePerformanceData = { points: [] };

  /** Výška grafu v px */
  @Input() height = 300;

  /** Zobrazit čáru investované částky */
  @Input() showInvestedLine = true;

  /** Zobrazit vysokou/nízkou hodnotu */
  @Input() showHighLowValues = true;

  /** Zobrazit zavírací hodnotu */
  @Input() showClosingValue = true;

  /** Zobrazit legendu */
  @Input() showLegend = true;

  /** Zobrazit tooltip */
  @Input() showTooltip = false;

  /** Zobrazit Y osu */
  @Input() showYAxis = false;

  /** Trend grafu (auto = automaticky podle dat) */
  @Input() trend: ChartTrend = 'auto';

  /** Jednotka hodnoty (měna) */
  @Input() valueUnit = '';

  /** Barva pro pozitivní trend */
  @Input() positiveColor: ChartColor = 'chart-in';

  /** Barva pro negativní trend */
  @Input() negativeColor: ChartColor = 'chart-out';

  /** Barva pro investovanou částku */
  @Input() investedColor: ChartColor = 'chart-bonds';

  /** Loading stav */
  @Input() loading = false;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  /** Počet skeleton bodů při loading */
  @Input() skeletonPointCount = 50;

  // ============ OUTPUTS ============

  /** Emituje při hoveru nad bodem */
  @Output() pointHover = new EventEmitter<{
    timestamp: Date | number | string;
    value: number;
    invested?: number;
  } | null>();

  /** Emituje při kliknutí na bod */
  @Output() pointClick = new EventEmitter<{
    timestamp: Date | number | string;
    value: number;
    invested?: number;
  }>();

  // ============ INTERNAL STATE ============

  hoveredSeriesIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signals for reactive data
  private dataSignal = signal<ValuePerformanceData>({ points: [] });
  private trendSignal = signal<ChartTrend>('auto');
  private showInvestedLineSignal = signal(true);

  // Computed: determine actual trend
  computedTrend = computed(() => {
    const trend = this.trendSignal();
    if (trend !== 'auto') return trend;

    const data = this.dataSignal();
    if (data.points.length < 2) return 'positive';

    const firstValue = data.points[0].value;
    const lastValue = data.points[data.points.length - 1].value;
    return lastValue >= firstValue ? 'positive' : 'negative';
  });

  // Computed: chart colors based on trend
  chartColors = computed(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const trend = this.computedTrend();
    const trendColor = trend === 'positive'
      ? this.chartColorService.getColorHex(this.positiveColor)
      : this.chartColorService.getColorHex(this.negativeColor);
    const investedColorHex = this.chartColorService.getColorHex(this.investedColor);

    return [trendColor, investedColorHex];
  });

  // Computed: series data for ApexCharts
  chartSeries = computed<ApexAxisChartSeries>(() => {
    const data = this.dataSignal();
    const showInvested = this.showInvestedLineSignal();
    const series: ApexAxisChartSeries = [];

    // Value series (area)
    const valueData = data.points.map(p => ({
      x: new Date(p.timestamp).getTime(),
      y: p.value,
    }));
    series.push({
      name: 'Hodnota',
      type: 'area',
      data: valueData,
    });

    // Invested series (line) - only if data exists and showInvestedLine
    const hasInvestedData = data.points.some(p => p.invested !== undefined);
    if (showInvested && hasInvestedData) {
      const investedData = data.points
        .filter(p => p.invested !== undefined)
        .map(p => ({
          x: new Date(p.timestamp).getTime(),
          y: p.invested!,
        }));
      series.push({
        name: 'Investováno',
        type: 'line',
        data: investedData,
      });
    }

    return series;
  });

  // Computed: legend items
  legendItems = computed<ChartLegendItem[]>(() => {
    const colors = this.chartColors();
    const data = this.dataSignal();
    const showInvested = this.showInvestedLineSignal();
    const items: ChartLegendItem[] = [];

    // Value legend item
    const lastPoint = data.points[data.points.length - 1];
    items.push({
      label: 'Hodnota',
      value: lastPoint?.value ?? 0,
      color: colors[0],
      percent: 0,
    });

    // Invested legend item (if applicable)
    const hasInvestedData = data.points.some(p => p.invested !== undefined);
    if (showInvested && hasInvestedData) {
      items.push({
        label: 'Investováno',
        value: lastPoint?.invested ?? 0,
        color: colors[1],
        percent: 0,
      });
    }

    return items;
  });

  // Computed: annotations for high/low/closing values
  computedAnnotations = computed<ApexAnnotations>(() => {
    const data = this.dataSignal();
    const annotations: ApexAnnotations = { yaxis: [], points: [] };

    if (data.points.length === 0) return annotations;

    const colors = this.chartColors();

    // Find high and low values if not provided
    let highValue = data.highValue;
    let lowValue = data.lowValue;
    let highPoint: ValuePerformanceDataPoint | undefined;
    let lowPoint: ValuePerformanceDataPoint | undefined;

    if (highValue === undefined || lowValue === undefined) {
      data.points.forEach(p => {
        if (highValue === undefined || p.value > highValue) {
          highValue = p.value;
          highPoint = p;
        }
        if (lowValue === undefined || p.value < lowValue) {
          lowValue = p.value;
          lowPoint = p;
        }
      });
    }

    // High value annotation
    if (this.showHighLowValues && highPoint) {
      annotations.points!.push({
        x: new Date(highPoint.timestamp).getTime(),
        y: highPoint.value,
        marker: {
          size: 6,
          fillColor: colors[0],
          strokeColor: '#fff',
          strokeWidth: 2,
        },
        label: {
          text: this.formatValue(highPoint.value),
          borderColor: 'transparent',
          style: {
            background: 'transparent',
            color: CHART_COLORS.contentSecondary,
            fontSize: '10px',
            fontWeight: 600,
          },
          offsetY: -10,
        },
      });
    }

    // Low value annotation
    if (this.showHighLowValues && lowPoint && lowPoint !== highPoint) {
      annotations.points!.push({
        x: new Date(lowPoint.timestamp).getTime(),
        y: lowPoint.value,
        marker: {
          size: 6,
          fillColor: colors[0],
          strokeColor: '#fff',
          strokeWidth: 2,
        },
        label: {
          text: this.formatValue(lowPoint.value),
          borderColor: 'transparent',
          style: {
            background: 'transparent',
            color: CHART_COLORS.contentSecondary,
            fontSize: '10px',
            fontWeight: 600,
          },
          offsetY: 15,
        },
      });
    }

    // Closing value annotation (last point)
    if (this.showClosingValue && data.points.length > 0) {
      const lastPoint = data.points[data.points.length - 1];
      annotations.points!.push({
        x: new Date(lastPoint.timestamp).getTime(),
        y: lastPoint.value,
        marker: {
          size: 6,
          fillColor: colors[0],
          strokeColor: '#fff',
          strokeWidth: 2,
        },
        label: {
          text: this.formatValue(lastPoint.value),
          borderColor: 'transparent',
          style: {
            background: 'transparent',
            color: CHART_COLORS.contentSecondary,
            fontSize: '10px',
            fontWeight: 600,
          },
          offsetX: 10,
        },
      });
    }

    return annotations;
  });

  // Chart configs (dynamic)
  chartConfig!: ApexChart;
  strokeConfig!: ApexStroke;
  fillConfig!: ApexFill;
  markersConfig!: ApexMarkers;
  xAxisConfig!: ApexXAxis;
  yAxisConfig!: ApexYAxis;
  gridConfig!: ApexGrid;
  tooltipConfig!: ApexTooltip;
  dataLabelsConfig!: ApexDataLabels;
  annotationsConfig!: ApexAnnotations;

  // Chart configs (static)
  readonly statesConfig = STATES_CONFIG;
  readonly legendConfig = LEGEND_CONFIG;

  // ============ LIFECYCLE ============

  ngOnInit(): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  private syncSignals(): void {
    this.dataSignal.set(this.data);
    this.trendSignal.set(this.trend);
    this.showInvestedLineSignal.set(this.showInvestedLine);
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const self = this;
    const colors = this.chartColors();

    this.chartConfig = {
      type: 'line',
      height: this.height,
      fontFamily: 'inherit',
      ...(this.nonce && { nonce: this.nonce }),
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          const point = self.data.points[dataPointIndex];
          if (point) {
            self.pointClick.emit({
              timestamp: point.timestamp,
              value: point.value,
              invested: point.invested,
            });
          }
        },
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const { dataPointIndex } = config;
          self.hoveredSeriesIndex.set(dataPointIndex);
          const point = self.data.points[dataPointIndex];
          if (point) {
            self.pointHover.emit({
              timestamp: point.timestamp,
              value: point.value,
              invested: point.invested,
            });
          }
        },
        dataPointMouseLeave: () => {
          self.hoveredSeriesIndex.set(-1);
          self.pointHover.emit(null);
        },
      },
    };

    this.strokeConfig = {
      curve: 'smooth',
      width: [2, 2],
      dashArray: [0, 5], // solid for value, dashed for invested
    };

    this.fillConfig = {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
      opacity: [1, 1],
    };

    this.markersConfig = {
      size: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    };

    this.xAxisConfig = {
      type: 'datetime',
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
        datetimeUTC: false,
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    };

    this.yAxisConfig = {
      show: this.showYAxis,
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
        formatter: (val: number) => this.formatValue(val),
      },
      opposite: true,
    };

    this.gridConfig = {
      borderColor: CHART_COLORS.gridBorder,
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    };

    this.tooltipConfig = {
      enabled: this.showTooltip,
      shared: true,
      intersect: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const point = this.data.points[dataPointIndex];
        if (!point) return '';

        const date = new Date(point.timestamp);
        const formattedDate = this.formatDate(date);
        const unit = this.valueUnit ? ` ${this.valueUnit}` : '';

        let html = `
          <div class="co-value-performance-tooltip">
            <div class="co-value-performance-tooltip__header">${formattedDate}</div>
            <div class="co-value-performance-tooltip__row">
              <span class="co-value-performance-tooltip__dot" style="background-color: ${colors[0]}"></span>
              <span class="co-value-performance-tooltip__label">Hodnota</span>
              <span class="co-value-performance-tooltip__value">${this.formatValue(point.value)}${unit}</span>
            </div>
        `;

        if (point.invested !== undefined && this.showInvestedLine) {
          html += `
            <div class="co-value-performance-tooltip__row">
              <span class="co-value-performance-tooltip__dot" style="background-color: ${colors[1]}"></span>
              <span class="co-value-performance-tooltip__label">Investováno</span>
              <span class="co-value-performance-tooltip__value">${this.formatValue(point.invested)}${unit}</span>
            </div>
          `;
        }

        html += '</div>';
        return html;
      },
    };

    this.dataLabelsConfig = {
      enabled: false,
    };

    this.annotationsConfig = this.computedAnnotations();
  }

  // ============ PUBLIC METHODS ============

  formatValue(value: number): string {
    return value.toLocaleString('cs-CZ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onLegendItemHover(index: number): void {
    this.hoveredSeriesIndex.set(index);
    this.isLegendHover.set(true);
    this.highlightSeries(index);
  }

  onLegendItemLeave(): void {
    this.hoveredSeriesIndex.set(-1);
    this.isLegendHover.set(false);
    this.highlightSeries(-1);
  }

  onLegendItemClick(index: number): void {
    // Toggle series visibility could be implemented here
  }

  private highlightSeries(activeIndex: number): void {
    if (!this.isBrowser) return;

    const hostEl = this.elementRef.nativeElement as HTMLElement;
    const seriesGroups = hostEl.querySelectorAll('.apexcharts-series');

    seriesGroups.forEach((group, i) => {
      const el = group as SVGGElement;
      if (activeIndex === -1) {
        el.style.removeProperty('opacity');
      } else {
        el.style.opacity = i === activeIndex ? '1' : '0.35';
      }
    });
  }

  // Skeleton helpers
  get skeletonPoints(): number[] {
    return Array.from({ length: this.skeletonPointCount }, (_, i) => i);
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexStates,
  ApexResponsive,
  ApexStroke,
  ChartComponent,
} from 'ng-apexcharts';

// ============ TYPES ============

/** Typ formátu hodnot */
export type ValueFormat = 'absolute' | 'percent';

/** Velikostní varianta grafu */
export type ChartSize = 'sm' | 'md' | 'lg' | 'auto';

/** Data pro jednotlivou sérii */
export interface DonutChartDataItem {
  label: string;
  value: number;
  color?: string;
}

/** Item pro legendu */
export interface ChartLegendItem {
  label: string;
  value: number;
  color: string;
  percent: number;
}

/** Konfigurace velikostí */
const SIZE_CONFIG: Record<Exclude<ChartSize, 'auto'>, { height: number; donutSize: string; fontSize: string }> = {
  sm: { height: 180, donutSize: '60%', fontSize: '11px' },
  md: { height: 280, donutSize: '65%', fontSize: '13px' },
  lg: { height: 380, donutSize: '70%', fontSize: '14px' },
};

// ============ COMPONENT ============

@Component({
  selector: 'co-donut-chart',
  templateUrl: './co-donut-chart.component.html',
  styleUrls: ['./co-donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoDonutChartComponent implements OnChanges, OnDestroy {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: DonutChartDataItem[] = [];

  /** Titulek grafu */
  @Input() title?: string;

  /** Velikostní varianta (sm, md, lg, auto) */
  @Input() size: ChartSize = 'md';

  /** Vlastní výška grafu v px (přepíše size) */
  @Input() height?: number;

  /** Zobrazit legendu */
  @Input() showLegend = true;

  /** Zobrazit hodnoty v legendě */
  @Input() showLegendValues = true;

  /** Zobrazit hodnoty na výsečích */
  @Input() showDataLabels = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = true;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'percent';

  /** Text uprostřed grafu (max 3 řádky, pak elipsis) */
  @Input() centerText?: string;

  /** Vlastní barvy */
  @Input() colors?: string[];

  /** Minimální hodnota pro seskupení do "Ostatní" */
  @Input() minValue?: number;

  /** Loading stav */
  @Input() loading = false;

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na segment */
  @Output() segmentClick = new EventEmitter<{ item: DonutChartDataItem; index: number }>();

  /** Emituje při hoveru nad segmentem */
  @Output() segmentHover = new EventEmitter<{ item: DonutChartDataItem; index: number } | null>();

  // ============ INTERNAL STATE ============

  hoveredIndex = -1;

  // Computed values
  processedData: DonutChartDataItem[] = [];
  total = 0;
  chartSeries: ApexNonAxisChartSeries = [];
  chartLabels: string[] = [];
  chartColors: string[] = [];
  legendItems: ChartLegendItem[] = [];

  // Size computed
  computedSize = 280;
  computedDonutSize = '65%';
  computedFontSize = '13px';

  // Chart configs
  chartConfig!: ApexChart;
  plotOptionsConfig!: ApexPlotOptions;
  dataLabelsConfig!: ApexDataLabels;
  tooltipConfig!: ApexTooltip;
  statesConfig!: ApexStates;
  legendConfig!: ApexLegend;
  strokeConfig!: ApexStroke;
  responsiveConfig!: ApexResponsive[];

  // ============ PRIVATE ============

  // Chart colors from design tokens
  private readonly defaultColors = [
    '#267c29', // chart-plot-in (green)
    '#b53022', // attention-alert (red)
    '#1e3a5f', // dark blue
    '#f97316', // orange
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#eab308', // yellow
    '#ec4899', // pink
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  // ============ LIFECYCLE ============

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSizeValues();
    this.updateComputedValues();
    this.updateChartConfigs();
  }

  ngOnDestroy(): void {
    // Chart cleanup handled by ng-apexcharts
  }

  // ============ PRIVATE METHODS ============

  private updateSizeValues(): void {
    // Custom height overrides size preset
    if (this.height !== undefined) {
      this.computedSize = this.height;
      this.computedDonutSize = '65%';
      this.computedFontSize = '13px';
      return;
    }

    // Auto size - use medium defaults
    if (this.size === 'auto') {
      this.computedSize = 280;
      this.computedDonutSize = '65%';
      this.computedFontSize = '13px';
      return;
    }

    // Preset sizes
    const config = SIZE_CONFIG[this.size];
    this.computedSize = config.height;
    this.computedDonutSize = config.donutSize;
    this.computedFontSize = config.fontSize;
  }

  private updateComputedValues(): void {
    // Process data (group small values)
    if (this.minValue) {
      const mainItems: DonutChartDataItem[] = [];
      let otherValue = 0;

      for (const item of this.data) {
        if (item.value >= this.minValue) {
          mainItems.push(item);
        } else {
          otherValue += item.value;
        }
      }

      if (otherValue > 0) {
        mainItems.push({ label: 'Ostatní', value: otherValue, color: '#9ca3af' });
      }
      this.processedData = mainItems;
    } else {
      this.processedData = [...this.data];
    }

    // Calculate total
    this.total = this.processedData.reduce((sum, item) => sum + item.value, 0);

    // Chart series and labels
    this.chartSeries = this.processedData.map(item => item.value);
    this.chartLabels = this.processedData.map(item => item.label);

    // Colors
    if (this.colors?.length) {
      this.chartColors = this.colors;
    } else {
      this.chartColors = this.processedData.map((item, i) =>
        item.color ?? this.defaultColors[i % this.defaultColors.length]
      );
    }

    // Legend items
    this.legendItems = this.processedData.map((item, i) => ({
      label: item.label,
      value: item.value,
      color: this.chartColors[i],
      percent: this.total > 0 ? (item.value / this.total) * 100 : 0,
    }));
  }

  private updateChartConfigs(): void {
    const self = this;

    this.chartConfig = {
      type: 'donut',
      width: this.computedSize,
      height: this.computedSize,
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const item = self.processedData[config.dataPointIndex];
          self.segmentClick.emit({ item, index: config.dataPointIndex });
        },
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          self.hoveredIndex = config.dataPointIndex;
          const item = self.processedData[config.dataPointIndex];
          self.segmentHover.emit({ item, index: config.dataPointIndex });
          self.cdr.markForCheck();
        },
        dataPointMouseLeave: () => {
          self.hoveredIndex = -1;
          self.segmentHover.emit(null);
          self.cdr.markForCheck();
        },
      },
    };

    this.plotOptionsConfig = {
      pie: {
        donut: {
          size: this.computedDonutSize,
          labels: {
            show: false,
          },
        },
        expandOnClick: false,
      },
    };

    this.dataLabelsConfig = {
      enabled: this.showDataLabels,
      formatter: (val: number, opts: any) => {
        if (this.valueFormat === 'percent') {
          return `${val.toFixed(0)}%`;
        }
        const value = this.processedData[opts.seriesIndex]?.value ?? 0;
        return this.formatValue(value);
      },
      style: {
        fontSize: this.computedFontSize,
        fontWeight: 500,
        colors: ['#6b7280'],
      },
      background: {
        enabled: true,
        foreColor: '#6b7280',
        borderRadius: 2,
        padding: 6,
        opacity: 1,
        borderWidth: 0,
      },
      dropShadow: {
        enabled: false,
      },
    };

    this.tooltipConfig = {
      enabled: this.showTooltip,
      fillSeriesColor: false,
      custom: ({ series, seriesIndex, w }: any) => {
        const label = w.config.labels[seriesIndex];
        const value = series[seriesIndex];
        const percent = this.total > 0 ? ((value / this.total) * 100).toFixed(1) : '0';
        const color = this.chartColors[seriesIndex];

        return `
          <div class="co-donut-tooltip">
            <span class="co-donut-tooltip__color" style="background-color: ${color}"></span>
            <span class="co-donut-tooltip__label">${label}</span>
            <span class="co-donut-tooltip__value">${this.formatValue(value)}</span>
            <span class="co-donut-tooltip__percent">(${percent}%)</span>
          </div>
        `;
      },
    };

    this.statesConfig = {
      hover: {
        filter: {
          type: 'darken',
          value: 0.15,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.2,
        },
      },
    };

    this.strokeConfig = {
      show: true,
      width: 2,
      colors: ['#ffffff'],
    };

    this.legendConfig = { show: false };

    this.responsiveConfig = [
      {
        breakpoint: 480,
        options: {
          dataLabels: {
            style: {
              fontSize: '10px',
            },
          },
        },
      },
    ];
  }

  // ============ PUBLIC METHODS ============

  formatValue(value: number): string {
    return value.toLocaleString('cs-CZ');
  }

  formatLegendValue(item: ChartLegendItem): string {
    if (this.valueFormat === 'percent') {
      return `${item.percent.toFixed(1)}%`;
    }
    return this.formatValue(item.value);
  }

  onLegendItemHover(index: number): void {
    this.hoveredIndex = index;
    const chart = this.chartComponent?.chart as any;
    if (chart?.toggleDataPointSelection) {
      chart.toggleDataPointSelection(index);
    }
  }

  onLegendItemLeave(): void {
    this.hoveredIndex = -1;
    const chart = this.chartComponent?.chart as any;
    if (chart?.resetSeries) {
      chart.resetSeries();
    }
  }

  onLegendItemClick(index: number): void {
    const item = this.processedData[index];
    this.segmentClick.emit({ item, index });
  }
}

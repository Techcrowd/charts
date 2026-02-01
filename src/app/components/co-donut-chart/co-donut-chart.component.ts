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
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { CoChartLegendComponent, ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
import { ValueFormat, CHART_COLORS } from '../../shared/chart-types';

// ============ TYPES ============

// Re-export types for consumers of this component
export { ChartColor } from '../../services/chart-color.service';
export { ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
export { ValueFormat } from '../../shared/chart-types';

/** Data pro jednotlivou sérii */
export interface DonutChartDataItem {
  label: string;
  value: number;
}

/** Statické ApexCharts konfigurace */
const STATES_CONFIG: ApexStates = {
  hover: { filter: { type: 'none' } },
  active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } },
};

const STROKE_CONFIG: ApexStroke = {
  show: true,
  width: 2,
  colors: [CHART_COLORS.backgroundSurface],
};

const LEGEND_CONFIG: ApexLegend = { show: false };

// ============ COMPONENT ============

@Component({
  selector: 'co-donut-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-donut-chart.component.html',
  styleUrls: ['./co-donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoDonutChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: DonutChartDataItem[] = [];

  /** Vlastní výška grafu v px */
  @Input() height = 280;

  /** Zobrazit legendu */
  @Input() showLegend = true;

  /** Zobrazit hodnoty v legendě */
  @Input() showLegendValues = false;

  /** Zobrazit hodnoty na výsečích */
  @Input() showDataLabels = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = false;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'percent';

  /** Text uprostřed grafu (max 3 řádky, pak elipsis) */
  @Input() centerText?: string;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Minimální hodnota pro seskupení do "Ostatní" */
  @Input() minValue?: number;

  /** Loading stav */
  @Input() loading = false;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  /** Počet skeleton položek legendy při loading */
  @Input() skeletonLegendCount = 4;

  /** Pole pro skeleton legend items */
  get skeletonItems(): number[] {
    return Array.from({ length: this.skeletonLegendCount }, (_, i) => i);
  }

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na segment */
  @Output() segmentClick = new EventEmitter<{ item: DonutChartDataItem; index: number }>();

  /** Emituje při hoveru nad segmentem */
  @Output() segmentHover = new EventEmitter<{ item: DonutChartDataItem; index: number } | null>();

  // ============ INTERNAL STATE ============

  hoveredIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signals for reactive data
  private dataSignal = signal<DonutChartDataItem[]>([]);
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);
  private minValueSignal = signal<number | undefined>(undefined);

  // Computed values
  processedData = computed(() => {
    const data = this.dataSignal();
    const minValue = this.minValueSignal();

    if (!minValue) return [...data];

    const mainItems: DonutChartDataItem[] = [];
    let otherValue = 0;

    for (const item of data) {
      if (item.value >= minValue) {
        mainItems.push(item);
      } else {
        otherValue += item.value;
      }
    }

    if (otherValue > 0) {
      mainItems.push({ label: 'Ostatní', value: otherValue });
    }
    return mainItems;
  });

  total = computed(() =>
    this.processedData().reduce((sum, item) => sum + item.value, 0)
  );

  chartSeries = computed<ApexNonAxisChartSeries>(() =>
    this.processedData().map(item => item.value)
  );

  chartLabels = computed(() =>
    this.processedData().map(item => item.label)
  );

  chartColors = computed(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const colors = this.colorsSignal();
    const dataLength = this.processedData().length;

    if (colors?.length) {
      return this.chartColorService.getColorsHex(colors);
    }
    return this.chartColorService.getDefaultColorsHex(dataLength);
  });

  legendItems = computed<ChartLegendItem[]>(() => {
    const processed = this.processedData();
    const colors = this.chartColors();
    const total = this.total();

    return processed.map((item, i) => ({
      label: item.label,
      value: item.value,
      color: colors[i],
      percent: total > 0 ? (item.value / total) * 100 : 0,
    }));
  });

  // Size computed
  computedDonutSize = '65%';

  // Chart configs (dynamic)
  chartConfig!: ApexChart;
  plotOptionsConfig!: ApexPlotOptions;
  dataLabelsConfig!: ApexDataLabels;
  tooltipConfig!: ApexTooltip;
  responsiveConfig!: ApexResponsive[];

  // Chart configs (static) - use constants
  readonly statesConfig = STATES_CONFIG;
  readonly strokeConfig = STROKE_CONFIG;
  readonly legendConfig = LEGEND_CONFIG;

  // ============ LIFECYCLE ============

  ngOnInit(): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  ngOnChanges(): void {
    this.syncSignals();
    this.updateSizeValues();
    this.updateChartConfigs();
  }

  private syncSignals(): void {
    this.dataSignal.set(this.data);
    this.colorsSignal.set(this.colors);
    this.minValueSignal.set(this.minValue);
  }

  // ============ PRIVATE METHODS ============

  private updateSizeValues(): void {
    this.computedDonutSize = '65%';
  }

  private updateChartConfigs(): void {
    const self = this;

    this.chartConfig = {
      type: 'donut',
      width: this.height,
      height: this.height,
      fontFamily: 'inherit',
      ...(this.nonce && { nonce: this.nonce }),
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const item = self.processedData()[config.dataPointIndex];
          self.segmentClick.emit({ item, index: config.dataPointIndex });
        },
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          self.hoveredIndex.set(config.dataPointIndex);
          const item = self.processedData()[config.dataPointIndex];
          self.segmentHover.emit({ item, index: config.dataPointIndex });
        },
        dataPointMouseLeave: () => {
          self.hoveredIndex.set(-1);
          self.segmentHover.emit(null);
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
        const value = this.processedData()[opts.seriesIndex]?.value ?? 0;
        return this.formatValue(value);
      },
      style: {
        fontSize: '10px',
        fontWeight: 400,
        colors: [CHART_COLORS.contentTertiary],
      },
      background: {
        enabled: true,
        foreColor: CHART_COLORS.contentTertiary,
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

        return `
          <div class="co-donut-tooltip">
            <span class="co-donut-tooltip__label">${label}</span>
            <span class="co-donut-tooltip__value">${this.formatValue(value)} ks</span>
          </div>
        `;
      },
    };

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

  onLegendItemHover(index: number): void {
    this.hoveredIndex.set(index);
    this.isLegendHover.set(true);
    this.highlightSegment(index);
  }

  onLegendItemLeave(): void {
    this.hoveredIndex.set(-1);
    this.isLegendHover.set(false);
    this.highlightSegment(-1);
  }

  onLegendItemClick(index: number): void {
    const item = this.processedData()[index];
    this.segmentClick.emit({ item, index });
  }

  private highlightSegment(activeIndex: number): void {
    if (!this.isBrowser) return;

    const hostEl = this.elementRef.nativeElement as HTMLElement;
    const segments = hostEl.querySelectorAll('.apexcharts-pie-area');

    segments.forEach((segment, i) => {
      const el = segment as SVGPathElement;
      if (activeIndex === -1) {
        // Remove inline style so CSS can take over
        el.style.removeProperty('opacity');
      } else {
        el.style.opacity = i === activeIndex ? '1' : '0.35';
      }
    });
  }
}

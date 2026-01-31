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
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexStates,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStroke,
  ApexResponsive,
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

/** Jednotlivá série dat */
export interface BarChartSeries {
  name: string;
  data: number[];
}

/** Data pro celý graf */
export interface BarChartData {
  categories: string[];
  series: BarChartSeries[];
}

/** Statické ApexCharts konfigurace */
const STATES_CONFIG: ApexStates = {
  hover: { filter: { type: 'none' } },
  active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } },
};

const LEGEND_CONFIG: ApexLegend = { show: false };

// ============ COMPONENT ============

@Component({
  selector: 'co-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-bar-chart.component.html',
  styleUrls: ['./co-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoBarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: BarChartData = { categories: [], series: [] };

  /** Výška grafu v px */
  @Input() height = 300;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit hodnoty na barech */
  @Input() showDataLabels = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = false;

  /** Zobrazit grid */
  @Input() showGrid = true;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'absolute';

  /** Titulek X osy */
  @Input() xAxisTitle?: string;

  /** Jednotka pro hodnoty (zobrazí se v tooltipu) */
  @Input() valueUnit?: string;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Loading stav */
  @Input() loading = false;

  /** Počet skeleton řádků při loading */
  @Input() skeletonRowCount = 5;

  /** Počet skeleton sérií při loading */
  @Input() skeletonSeriesCount = 1;

  /** Pole pro skeleton rows */
  get skeletonRows(): number[] {
    return Array.from({ length: this.skeletonRowCount }, (_, i) => i);
  }

  /** Pole pro skeleton series items */
  get skeletonSeriesItems(): number[] {
    return Array.from({ length: this.skeletonSeriesCount }, (_, i) => i);
  }

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na bar */
  @Output() barClick = new EventEmitter<{
    seriesIndex: number;
    dataPointIndex: number;
    value: number;
    category: string;
    seriesName: string;
  }>();

  /** Emituje při hoveru nad barem */
  @Output() barHover = new EventEmitter<{
    seriesIndex: number;
    dataPointIndex: number;
    value: number;
    category: string;
    seriesName: string;
  } | null>();

  // ============ INTERNAL STATE ============

  hoveredSeriesIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signals for reactive data
  private dataSignal = signal<BarChartData>({ categories: [], series: [] });
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);

  // Computed values
  chartSeries = computed<ApexAxisChartSeries>(() => {
    const data = this.dataSignal();
    return data.series.map(s => ({
      name: s.name,
      data: s.data,
    }));
  });

  chartColors = computed(() => {
    const colors = this.colorsSignal();
    const seriesLength = this.dataSignal().series.length;

    if (colors?.length) {
      return this.chartColorService.getColorsHex(colors);
    }
    // Default color for bar chart is chart-bonds
    const defaultColors: ChartColor[] = ['chart-bonds', 'chart-stocks', 'chart-in', 'chart-out'];
    return this.chartColorService.getColorsHex(defaultColors.slice(0, seriesLength));
  });

  legendItems = computed<ChartLegendItem[]>(() => {
    const data = this.dataSignal();
    const colors = this.chartColors();

    return data.series.map((series, i) => {
      const total = series.data.reduce((sum, val) => sum + val, 0);
      return {
        label: series.name,
        value: total,
        color: colors[i],
        percent: 0,
      };
    });
  });

  // Chart configs (dynamic)
  chartConfig!: ApexChart;
  plotOptionsConfig!: ApexPlotOptions;
  dataLabelsConfig!: ApexDataLabels;
  tooltipConfig!: ApexTooltip;
  xAxisConfig!: ApexXAxis;
  yAxisConfig!: ApexYAxis;
  gridConfig!: ApexGrid;
  strokeConfig!: ApexStroke;
  responsiveConfig!: ApexResponsive[];

  // Chart configs (static)
  readonly statesConfig = STATES_CONFIG;
  readonly legendConfig = LEGEND_CONFIG;

  // ============ LIFECYCLE ============

  ngOnInit(): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  ngOnChanges(): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  private syncSignals(): void {
    this.dataSignal.set(this.data);
    this.colorsSignal.set(this.colors);
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const self = this;

    this.chartConfig = {
      type: 'bar',
      height: this.height,
      fontFamily: 'inherit',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          const value = self.data.series[seriesIndex]?.data[dataPointIndex] ?? 0;
          const category = self.data.categories[dataPointIndex] ?? '';
          const seriesName = self.data.series[seriesIndex]?.name ?? '';
          self.barClick.emit({ seriesIndex, dataPointIndex, value, category, seriesName });
        },
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          self.hoveredSeriesIndex.set(seriesIndex);
          const value = self.data.series[seriesIndex]?.data[dataPointIndex] ?? 0;
          const category = self.data.categories[dataPointIndex] ?? '';
          const seriesName = self.data.series[seriesIndex]?.name ?? '';
          self.barHover.emit({ seriesIndex, dataPointIndex, value, category, seriesName });
        },
        dataPointMouseLeave: () => {
          self.hoveredSeriesIndex.set(-1);
          self.barHover.emit(null);
        },
      },
    };

    this.plotOptionsConfig = {
      bar: {
        horizontal: true,
        barHeight: '32px',
        borderRadius: 2,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top',
        },
      },
    };

    this.dataLabelsConfig = {
      enabled: this.showDataLabels,
      textAnchor: 'end',
      offsetX: -8,
      style: {
        fontSize: '10px',
        fontWeight: 400,
        colors: [CHART_COLORS.contentTertiary],
      },
      formatter: (val: number) => this.formatValue(val),
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
      shared: false,
      intersect: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const seriesName = w.config.series[seriesIndex].name;
        const value = series[seriesIndex][dataPointIndex];
        const category = w.config.xaxis.categories[dataPointIndex];
        const unit = this.valueUnit ? ` ${this.valueUnit}` : '';

        return `
          <div class="co-bar-tooltip">
            <div class="co-bar-tooltip__header">${category}</div>
            <div class="co-bar-tooltip__row">
              <span class="co-bar-tooltip__label">${seriesName}</span>
              <span class="co-bar-tooltip__value">${this.formatValue(value)}${unit}</span>
            </div>
          </div>
        `;
      },
    };

    // Y axis shows categories (horizontal bar chart)
    this.yAxisConfig = {
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
      },
    };

    // X axis shows values (horizontal bar chart)
    this.xAxisConfig = {
      categories: this.data.categories,
      title: {
        text: this.xAxisTitle,
        style: {
          color: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
        formatter: (val: string) => this.formatValue(Number(val)),
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    };

    this.gridConfig = {
      show: this.showGrid,
      borderColor: CHART_COLORS.gridBorder,
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    };

    this.strokeConfig = {
      show: true,
      width: 2,
      colors: ['transparent'],
    };

    this.responsiveConfig = [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              barHeight: '24px',
            },
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              barHeight: '20px',
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
    const series = this.data.series[index];
    if (series) {
      const total = series.data.reduce((sum, val) => sum + val, 0);
      this.barClick.emit({
        seriesIndex: index,
        dataPointIndex: -1,
        value: total,
        category: '',
        seriesName: series.name,
      });
    }
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
}

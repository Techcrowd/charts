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
import { ValueFormat, ChartSize, CHART_COLORS } from '../../shared/chart-types';

// ============ TYPES ============

/** Velikostní varianta grafu */
export type ColumnChartSize = ChartSize | 'auto';

// Re-export types for consumers of this component
export { ChartColor } from '../../services/chart-color.service';
export { ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
export { ValueFormat, ChartSize } from '../../shared/chart-types';

/** Jednotlivá série dat */
export interface ColumnChartSeries {
  name: string;
  data: number[];
}

/** Data pro celý graf */
export interface ColumnChartData {
  categories: string[];
  series: ColumnChartSeries[];
}

/** Konfigurace velikostí */
const SIZE_CONFIG: Record<ChartSize, { height: number; columnWidth: string }> = {
  sm: { height: 200, columnWidth: '40%' },
  md: { height: 300, columnWidth: '50%' },
  lg: { height: 400, columnWidth: '55%' },
};

/** Statické ApexCharts konfigurace */
const STATES_CONFIG: ApexStates = {
  hover: { filter: { type: 'none' } },
  active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } },
};

const LEGEND_CONFIG: ApexLegend = { show: false };

// ============ COMPONENT ============

@Component({
  selector: 'co-column-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-column-chart.component.html',
  styleUrls: ['./co-column-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoColumnChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: ColumnChartData = { categories: [], series: [] };

  /** Velikostní varianta (sm, md, lg, auto) */
  @Input() size: ColumnChartSize = 'md';

  /** Vlastní výška grafu v px (přepíše size) */
  @Input() height?: number;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit hodnoty na sloupcích */
  @Input() showDataLabels = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = false;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'absolute';

  /** Titulek Y osy */
  @Input() yAxisTitle?: string;

  /** Jednotka pro hodnoty (zobrazí se v tooltipu) */
  @Input() valueUnit?: string;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Loading stav */
  @Input() loading = false;

  /** Počet skeleton sloupců při loading */
  @Input() skeletonColumnCount = 6;

  /** Počet skeleton sérií při loading */
  @Input() skeletonSeriesCount = 3;

  /** Pole pro skeleton columns */
  get skeletonColumns(): number[] {
    return Array.from({ length: this.skeletonColumnCount }, (_, i) => i);
  }

  /** Pole pro skeleton series items */
  get skeletonSeriesItems(): number[] {
    return Array.from({ length: this.skeletonSeriesCount }, (_, i) => i);
  }

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na sloupec */
  @Output() columnClick = new EventEmitter<{
    seriesIndex: number;
    dataPointIndex: number;
    value: number;
    category: string;
    seriesName: string;
  }>();

  /** Emituje při hoveru nad sloupcem */
  @Output() columnHover = new EventEmitter<{
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
  private dataSignal = signal<ColumnChartData>({ categories: [], series: [] });
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
    return this.chartColorService.getDefaultColorsHex(seriesLength);
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
        percent: 0, // Not applicable for column charts
      };
    });
  });

  // Size computed
  computedHeight = 300;
  computedColumnWidth = '70%';

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
    this.updateSizeValues();
    this.updateChartConfigs();
  }

  private syncSignals(): void {
    this.dataSignal.set(this.data);
    this.colorsSignal.set(this.colors);
  }

  // ============ PRIVATE METHODS ============

  private updateSizeValues(): void {
    if (this.height !== undefined) {
      this.computedHeight = this.height;
      this.computedColumnWidth = '70%';
      return;
    }

    const sizeKey = this.size === 'auto' ? 'md' : this.size;
    const config = SIZE_CONFIG[sizeKey];
    this.computedHeight = config.height;
    this.computedColumnWidth = config.columnWidth;
  }

  private updateChartConfigs(): void {
    const self = this;

    this.chartConfig = {
      type: 'bar',
      height: this.computedHeight,
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
          self.columnClick.emit({ seriesIndex, dataPointIndex, value, category, seriesName });
        },
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          self.hoveredSeriesIndex.set(seriesIndex);
          const value = self.data.series[seriesIndex]?.data[dataPointIndex] ?? 0;
          const category = self.data.categories[dataPointIndex] ?? '';
          const seriesName = self.data.series[seriesIndex]?.name ?? '';
          self.columnHover.emit({ seriesIndex, dataPointIndex, value, category, seriesName });
        },
        dataPointMouseLeave: () => {
          self.hoveredSeriesIndex.set(-1);
          self.columnHover.emit(null);
        },
      },
    };

    // Calculate columnWidth to approximate max 32px per bar
    // Based on typical chart width ~800px
    const categoryCount = this.data.categories.length || 1;
    const seriesCount = this.data.series.length || 1;
    const maxBarWidth = 32;
    const estimatedChartWidth = 800;

    // Calculate space per category and target percentage
    const spacePerCategory = estimatedChartWidth / categoryCount;
    const targetGroupWidth = maxBarWidth * seriesCount;
    let targetPercent = (targetGroupWidth / spacePerCategory) * 100;

    // Clamp between 15% and 85%
    targetPercent = Math.max(15, Math.min(85, targetPercent));

    const columnWidth = `${Math.round(targetPercent)}%`;

    this.plotOptionsConfig = {
      bar: {
        horizontal: false,
        columnWidth: columnWidth,
        borderRadius: 2,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top',
        },
      },
    };

    this.dataLabelsConfig = {
      enabled: this.showDataLabels,
      offsetY: -20,
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
          <div class="co-column-tooltip">
            <div class="co-column-tooltip__header">${category}</div>
            <div class="co-column-tooltip__row">
              <span class="co-column-tooltip__label">${seriesName}</span>
              <span class="co-column-tooltip__value">${this.formatValue(value)}${unit}</span>
            </div>
          </div>
        `;
      },
    };

    this.xAxisConfig = {
      categories: this.data.categories,
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    };

    this.yAxisConfig = {
      title: {
        text: this.yAxisTitle,
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
        formatter: (val: number) => this.formatValue(val),
      },
    };

    this.gridConfig = {
      borderColor: '#e5e7eb',
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

    this.strokeConfig = {
      show: true,
      width: 2,
      colors: ['transparent'],
    };

    this.responsiveConfig = [
      {
        breakpoint: 600,
        options: {
          dataLabels: {
            enabled: false,
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
      this.columnClick.emit({
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

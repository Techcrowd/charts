import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  NgZone,
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
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStroke,
  ApexFill,
  ApexResponsive,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { DateTimeService } from '../../services/date-time.service';
import { CoChartLegendComponent, ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
import {
  ValueFormat,
  CHART_COLORS,
  CHART_STATES_CONFIG,
  CHART_LEGEND_CONFIG,
  highlightChartSeries,
} from '../../shared/chart-types';

// ============ TYPES ============

export { ChartColor } from '../../services/chart-color.service';
export { ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
export { ValueFormat } from '../../shared/chart-types';

/** Jednotlivá série dat */
export interface ColumnChartV2Series {
  name: string;
  data: number[];
}

/** Data pro celý graf */
export interface ColumnChartV2Data {
  categories: string[];
  series: ColumnChartV2Series[];
}

/** Event při kliknutí na sloupec */
export interface ColumnChartV2ClickEvent {
  seriesIndex: number;
  dataPointIndex: number;
  value: number;
  category: string;
  seriesName: string;
  x: string;
  y: number;
}

/** Event při hoveru nad sloupcem */
export interface ColumnChartV2HoverEvent {
  seriesIndex: number;
  dataPointIndex: number;
  value: number;
  category: string;
  seriesName: string;
}

// ============ COMPONENT ============

@Component({
  selector: 'co-column-chart-v2',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-column-chart-v2.component.html',
  styleUrls: ['./co-column-chart-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoColumnChartV2Component implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private dateTimeService = inject(DateTimeService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private ngZone = inject(NgZone);
  private boundClickHandler = this.handleChartClick.bind(this);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: ColumnChartV2Data = { categories: [], series: [] };

  /** Výška grafu v px */
  @Input() height = 300;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit hodnoty v legendě */
  @Input() showLegendValues = false;

  /** Zobrazit hodnoty na sloupcích */
  @Input() showDataLabels = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = false;

  /** Zobrazit popisky Y osy */
  @Input() showYAxisLabels = true;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'absolute';

  /** Titulek Y osy */
  @Input() yAxisTitle?: string;

  /** Jednotka pro hodnoty (zobrazí se v tooltipu) */
  @Input() valueUnit?: string;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Vlastní hodnoty do legendy (přebijí součty sérií) */
  @Input() legendValues?: Array<number | string | null | undefined>;

  /** Povolit interakci legendy (hover/click) */
  @Input() legendInteractive = true;

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
  @Output() columnClick = new EventEmitter<ColumnChartV2ClickEvent>();

  /** Emituje při hoveru nad sloupcem */
  @Output() columnHover = new EventEmitter<ColumnChartV2HoverEvent | null>();

  // ============ INTERNAL STATE ============

  hoveredSeriesIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signals for reactive data
  private dataSignal = signal<ColumnChartV2Data>({ categories: [], series: [] });
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);
  private legendValuesSignal = signal<Array<number | string | null | undefined> | undefined>(undefined);

  // ============ COMPUTED ============

  chartSeries = computed<ApexAxisChartSeries>(() => {
    const data = this.dataSignal();
    return data.series.map(s => ({
      name: s.name,
      data: s.data,
    }));
  });

  chartColors = computed(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
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
    const legendValues = this.legendValuesSignal();

    return data.series.map((series, i) => {
      const total = series.data.reduce((sum, val) => sum + val, 0);
      return {
        label: series.name,
        value: total,
        color: colors[i],
        percent: 0, // Not applicable for column charts
        displayValue: legendValues?.[i] ?? undefined,
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
  fillConfig: ApexFill = { opacity: 1 };
  responsiveConfig!: ApexResponsive[];

  // Chart configs (static) - use shared constants
  readonly statesConfig = CHART_STATES_CONFIG;
  readonly legendConfig = CHART_LEGEND_CONFIG;

  // ============ LIFECYCLE ============

  ngOnInit(): void {
    this.syncSignals();
    this.updateChartConfigs();
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.elementRef.nativeElement.addEventListener('click', this.boundClickHandler, true);
      });
    }
  }

  ngOnChanges(): void {
    this.syncSignals();
    this.updateChartConfigs();
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener('click', this.boundClickHandler, true);
  }

  private syncSignals(): void {
    this.dataSignal.set(this.data);
    this.colorsSignal.set(this.colors);
    this.legendValuesSignal.set(this.legendValues);
  }

  // ============ CLICK HANDLING ============

  private handleChartClick(event: Event): void {
    const me = event as MouseEvent;
    let target = me.target as Element;

    // If click hit an overlay (data label, foreignObject), find the bar area underneath
    if (!target.classList.contains('apexcharts-bar-area')) {
      const elements = document.elementsFromPoint(me.clientX, me.clientY);
      const bar = elements.find(el => el.classList.contains('apexcharts-bar-area'));
      if (!bar) return;
      target = bar;
    }

    const seriesIndex = parseInt(target.getAttribute('index') ?? '-1', 10);
    const dataPointIndex = parseInt(target.getAttribute('j') ?? '-1', 10);
    if (seriesIndex < 0 || dataPointIndex < 0) return;

    const series = this.data.series[seriesIndex];
    if (!series) return;

    const value = series.data[dataPointIndex] ?? 0;
    const category = this.data.categories[dataPointIndex] ?? '';

    this.ngZone.run(() => {
      this.columnClick.emit({
        seriesIndex,
        dataPointIndex,
        value,
        category,
        seriesName: series.name,
        x: category,
        y: value,
      });
    });
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const self = this;
    const nonce = this.isBrowser
      ? document.querySelector('head meta[name="csp-nonce"]')?.getAttribute('content') ?? ''
      : '';

    this.chartConfig = {
      type: 'bar',
      height: this.height,
      fontFamily: 'inherit',
      ...(nonce && { nonce }),
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 400,
      },
      events: {
        mounted: () => this.applyColumnGap(),
        updated: () => this.applyColumnGap(),
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          self.hoveredSeriesIndex.set(seriesIndex);
          self.highlightBars(seriesIndex, dataPointIndex);
          const value = self.data.series[seriesIndex]?.data[dataPointIndex] ?? 0;
          const category = self.data.categories[dataPointIndex] ?? '';
          const seriesName = self.data.series[seriesIndex]?.name ?? '';
          self.columnHover.emit({ seriesIndex, dataPointIndex, value, category, seriesName });
        },
        dataPointMouseLeave: () => {
          self.hoveredSeriesIndex.set(-1);
          self.highlightBars(-1, -1);
          self.columnHover.emit(null);
        },
      },
    };

    // Calculate columnWidth to approximate max 32px per bar
    // Based on typical chart width ~800px
    const seriesCount = this.data.series.length || 1;

    let columnWidth: number;

    switch (seriesCount) {
      case 1:
        columnWidth = 32;
        break;

      case 2:
        columnWidth = 14;
        break;

      case 3:
        columnWidth = 8;
        break;

      default:
        columnWidth = 14;
        break;
    }

    this.plotOptionsConfig = {
      bar: {
        horizontal: false,
        columnWidth: `${columnWidth}px`,
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
      followCursor: false,
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const seriesName = String(w.config.series[seriesIndex]?.name ?? '');
        const value = series[seriesIndex]?.[dataPointIndex] ?? 0;
        const category = String(w.config.xaxis.categories?.[dataPointIndex] ?? '');
        const unit = this.valueUnit ? ` ${this.valueUnit}` : '';

        return `
          <div class="co-column-tooltip-v2">
            <span class="co-column-tooltip-v2__label">${seriesName}</span>
            <span class="co-column-tooltip-v2__value">${category} ${this.formatValue(value)}${unit}</span>
          </div>
        `;
      },
    };

    this.xAxisConfig = {
      categories: this.data.categories,
      labels: {
        // Výsledná mezera 12px mezi osou X a horním okrajem textu:
        // 8px odsazení od osy + 4px top padding labelu.
        // POZOR: offsetY se do pozice promítá ~2x, hodnota je empirická
        // (ověřeno měřením v DOM; -3.25 = 8px, -1.25 = 12px)
        offsetY: -1.25,
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
      },
      axisBorder: {
        show: true,
        color: CHART_COLORS.contentTertiary,
      },
      axisTicks: {
        show: false,
      },
    };

    this.yAxisConfig = {
      title: {
        text: this.showYAxisLabels ? this.yAxisTitle : undefined,
        style: {
          color: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
      },
      labels: {
        show: this.showYAxisLabels,
        // -6 = výsledná mezera 4px mezi pravým okrajem textu a linií osy Y
        offsetX: -6,
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 600,
        },
        formatter: (val: number) => this.formatValue(val),
      },
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
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    };

    // Mezeru mezi sloupci nedělá stroke, ale applyColumnGap (translateX skupin sérií)
    this.strokeConfig = {
      show: true,
      width: 0,
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

  /**
   * Rozestaví skupiny sérií s pevnou mezerou 4px mezi sloupci ve skupině.
   * ApexCharts vykresluje sloupce skupiny těsně vedle sebe — posunem celých
   * sérií přes translateX vznikne vizuální gap (posouvají se i data labels).
   */
  private applyColumnGap(): void {
    if (!this.isBrowser) return;

    requestAnimationFrame(() => {
      const host = this.elementRef.nativeElement as HTMLElement;
      const seriesGroups = Array.from(host.querySelectorAll('.apexcharts-series'))
        .filter(group => group.querySelector('.apexcharts-bar-area')) as SVGGElement[];

      const gapPx = 4;
      const centerOffset = (seriesGroups.length - 1) / 2;

      seriesGroups.forEach((group, index) => {
        const offsetPx = (index - centerOffset) * gapPx;
        const realIndex = group.getAttribute('data:realIndex');
        group.style.transform = offsetPx === 0 ? '' : `translateX(${offsetPx}px)`;

        if (!realIndex) {
          return;
        }

        const dataLabels = host.querySelector(
          `.apexcharts-datalabels[data\\:realIndex='${realIndex}']`
        ) as SVGGElement | null;
        const dataLabelsBackground = host.querySelector(
          `.apexcharts-datalabels-background[data\\:realIndex='${realIndex}']`
        ) as SVGGElement | null;

        if (dataLabels) {
          dataLabels.style.transform = offsetPx === 0 ? '' : `translateX(${offsetPx}px)`;
        }

        if (dataLabelsBackground) {
          dataLabelsBackground.style.transform = offsetPx === 0 ? '' : `translateX(${offsetPx}px)`;
        }
      });
    });
  }

  // ============ PUBLIC METHODS ============

  formatValue(value: number): string {
    return this.dateTimeService.formatNumber(value, 0);
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
        dataPointIndex: -1, // click on whole series, not a specific column
        value: total,
        category: '',
        seriesName: series.name,
        x: '',
        y: total,
      });
    }
  }

  private highlightSeries(activeIndex: number): void {
    if (!this.isBrowser) return;
    highlightChartSeries(this.elementRef.nativeElement, activeIndex);
  }

  /**
   * Dimuje ostatní sloupce ve stejné skupině při hoveru.
   * Sloupce z jiných skupin zůstávají nedotčeny.
   */
  private highlightBars(activeSeriesIndex: number, activeDataPoint: number): void {
    if (!this.isBrowser) return;
    const bars = this.elementRef.nativeElement
      .querySelectorAll('.apexcharts-bar-area') as NodeListOf<SVGElement>;
    bars.forEach(bar => {
      if (activeDataPoint === -1) {
        bar.style.removeProperty('opacity');
      } else {
        const seriesIdx = parseInt(bar.getAttribute('index') ?? '-1', 10);
        const j = parseInt(bar.getAttribute('j') ?? '-1', 10);
        if (j === activeDataPoint) {
          // stejná skupina: hovered bar plný, ostatní bary skupiny ztmaví
          bar.style.opacity = seriesIdx === activeSeriesIndex ? '1' : '0.35';
        }
        // jiná skupina (j !== activeDataPoint): nedotýkat se
      }
    });
  }
}

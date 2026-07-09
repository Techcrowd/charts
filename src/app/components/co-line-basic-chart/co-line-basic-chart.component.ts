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
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStroke,
  ApexFill,
  ApexMarkers,
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
} from '../../shared/chart-types';

// ============ TYPES ============

// Re-export types for consumers of this component
export { ChartColor } from '../../services/chart-color.service';
export { ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
export { ValueFormat } from '../../shared/chart-types';

/** Jedna vývojová křivka */
export interface LineBasicSeries {
  name: string;
  data: number[];
}

/** Data pro celý graf */
export interface LineBasicChartData {
  /** Časové labely X osy (hodiny, dny, měsíce, roky — dle dat) */
  labels: string[];
  series: LineBasicSeries[];
}

/** Bublina s počáteční/cílovou hodnotou křivky */
interface ValueBubble {
  text: string;
  /** Vertikální pozice v % výšky plot area (0 = nahoře) */
  topPercent: number;
}

// ============ COMPONENT ============

@Component({
  selector: 'co-line-basic-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-line-basic-chart.component.html',
  styleUrls: ['./co-line-basic-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoLineBasicChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartComponent?: ChartComponent;

  // ============ INJECTED ============
  private elementRef = inject(ElementRef);
  private chartColorService = inject(ChartColorService);
  private dateTimeService = inject(DateTimeService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Data pro graf */
  @Input() data: LineBasicChartData = { labels: [], series: [] };

  /** Výška grafu v px (graf je na výšku fixní, na šířku responzivní) */
  @Input() height = 200;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit bubliny s počáteční hodnotou křivek */
  @Input() showStartValues = false;

  /** Zobrazit bubliny s cílovou hodnotou křivek */
  @Input() showEndValues = false;

  /** Zobrazit tooltip s ryskou (hodnoty pro vybraný čas) */
  @Input() showTooltip = false;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'absolute';

  /** Jednotka pro hodnoty (např. '$', '%', 'Kč') */
  @Input() valueUnit?: string;

  /** Zkracovat hodnoty (1 215 211 → 1,2M) */
  @Input() compactValues = false;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Loading stav */
  @Input() loading = false;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  /** Počet skeleton křivek při loading */
  @Input() skeletonSeriesCount = 3;

  /** Pole pro skeleton položky */
  get skeletonItems(): number[] {
    return Array.from({ length: this.skeletonSeriesCount }, (_, i) => i);
  }

  // ============ OUTPUTS ============

  /** Emituje při hoveru nad bodem křivky (null = mouse leave) */
  @Output() pointHover = new EventEmitter<{
    seriesIndex: number;
    dataPointIndex: number;
    seriesName: string;
    label: string;
    value: number;
  } | null>();

  // ============ INTERNAL STATE ============

  /** Skutečná pozice plot area (změřeno po renderu) — pro pozicování bublin */
  plotTop = signal(6);
  plotHeight = signal(160);

  hoveredSeriesIndex = signal(-1);
  isLegendHover = signal(false);

  private dataSignal = signal<LineBasicChartData>({ labels: [], series: [] });
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);

  // ============ COMPUTED ============

  visibleSeries = computed<LineBasicSeries[]>(() =>
    this.dataSignal().series.filter(s => s.data.length > 0)
  );

  chartSeries = computed<ApexAxisChartSeries>(() =>
    this.visibleSeries().map(s => ({ name: s.name, data: s.data }))
  );

  chartColors = computed(() => {
    this.chartColorService.getColorVersion()();
    const colors = this.colorsSignal();
    const count = this.visibleSeries().length;

    if (colors?.length) {
      return this.chartColorService.getColorsHex(colors);
    }
    return this.chartColorService.getDefaultColorsHex(count);
  });

  legendItems = computed<ChartLegendItem[]>(() => {
    const series = this.visibleSeries();
    const colors = this.chartColors();

    return series.map((s, i) => ({
      label: s.name,
      value: s.data[s.data.length - 1] ?? 0,
      color: colors[i],
      percent: 0,
    }));
  });

  /** Rozsah Y hodnot přes všechny křivky (pro pozicování bublin) */
  private valueRange = computed<{ min: number; max: number }>(() => {
    const all = this.visibleSeries().flatMap(s => s.data);
    if (!all.length) return { min: 0, max: 1 };
    const min = Math.min(...all);
    const max = Math.max(...all);
    return { min, max: max === min ? min + 1 : max };
  });

  /**
   * Bubliny s počáteční hodnotou — křivky se stejnou výchozí hodnotou
   * sdílejí jednu bublinu (zobrazí se jen jednou, neutrální barvou).
   */
  startValueBubbles = computed<ValueBubble[]>(() =>
    this.buildBubbles(s => s.data[0])
  );

  /** Bubliny s cílovou (konečnou) hodnotou */
  endValueBubbles = computed<ValueBubble[]>(() =>
    this.buildBubbles(s => s.data[s.data.length - 1])
  );

  private buildBubbles(pick: (s: LineBasicSeries) => number | undefined): ValueBubble[] {
    const series = this.visibleSeries();
    const { min, max } = this.valueRange();
    const seen = new Map<number, ValueBubble>();

    series.forEach(s => {
      const value = pick(s);
      // Stejná hodnota u více křivek → bublina jen jednou
      if (value === undefined || seen.has(value)) return;
      seen.set(value, {
        text: this.formatBubbleValue(value),
        topPercent: (1 - (value - min) / (max - min)) * 100,
      });
    });

    return [...seen.values()];
  }

  // Chart configs (dynamic)
  chartConfig!: ApexChart;
  dataLabelsConfig: ApexDataLabels = { enabled: false };
  tooltipConfig!: ApexTooltip;
  xAxisConfig!: ApexXAxis;
  yAxisConfig!: ApexYAxis;
  gridConfig!: ApexGrid;
  strokeConfig!: ApexStroke;
  fillConfig: ApexFill = { opacity: 1 };
  markersConfig!: ApexMarkers;

  // Chart configs (static)
  readonly statesConfig = CHART_STATES_CONFIG;
  readonly legendConfig = CHART_LEGEND_CONFIG;

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
      type: 'line',
      height: this.height,
      fontFamily: 'inherit',
      ...(this.nonce && { nonce: this.nonce }),
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        mounted: () => self.measurePlotArea(),
        updated: () => self.measurePlotArea(),
        mouseMove: (event: any, chartContext: any, config: any) => {
          const { seriesIndex, dataPointIndex } = config;
          if (seriesIndex < 0 || dataPointIndex < 0) return;
          const series = self.visibleSeries()[seriesIndex];
          if (!series) return;
          self.pointHover.emit({
            seriesIndex,
            dataPointIndex,
            seriesName: series.name,
            label: self.data.labels[dataPointIndex] ?? '',
            value: series.data[dataPointIndex] ?? 0,
          });
        },
        mouseLeave: () => self.pointHover.emit(null),
      },
    };

    this.strokeConfig = {
      curve: 'straight',
      width: 2,
    };

    // Body na křivkách jen při hoveru (crosshair)
    this.markersConfig = {
      size: 0,
      strokeWidth: 2,
      strokeColors: CHART_COLORS.backgroundSurface,
      hover: { size: 5 },
    };

    this.tooltipConfig = {
      enabled: this.showTooltip,
      shared: true,
      intersect: false,
      followCursor: false,
      custom: ({ dataPointIndex, w }: any) => {
        const label = this.data.labels[dataPointIndex] ?? '';
        const colors = this.chartColors();
        const rows = this.visibleSeries()
          .map((s, i) => {
            const value = s.data[dataPointIndex];
            if (value === undefined) return '';
            return `
              <div class="co-line-basic-tooltip__row">
                <span class="co-line-basic-tooltip__dot" style="background:${colors[i]}"></span>
                <span class="co-line-basic-tooltip__value">${this.formatValueWithUnit(value)}</span>
              </div>
            `;
          })
          .join('');

        return `
          <div class="co-line-basic-tooltip">
            <div class="co-line-basic-tooltip__header">${label}</div>
            ${rows}
          </div>
        `;
      },
    };

    this.xAxisConfig = {
      categories: this.data.labels,
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 400,
        },
        hideOverlappingLabels: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: {
        show: this.showTooltip,
        width: 1,
        stroke: {
          color: CHART_COLORS.contentTertiary,
          width: 1,
          dashArray: 0,
        },
      },
    };

    // Fixní rozsah = přesné mapování hodnot na piksely (bubliny, edge-to-edge)
    const { min, max } = this.valueRange();
    this.yAxisConfig = {
      show: false,
      min,
      max,
    };

    // Křivky od kraje do kraje — žádný grid, minimální padding
    this.gridConfig = {
      show: false,
      padding: { top: 6, bottom: 0, left: 14, right: 14 },
    };
  }

  /** Změří skutečnou plot area (line paths) pro přesné pozicování bublin */
  private measurePlotArea(): void {
    if (!this.isBrowser) return;
    requestAnimationFrame(() => {
      const host = this.elementRef.nativeElement as HTMLElement;
      const container = host.querySelector('.co-line-basic__chart-container') as HTMLElement | null;
      const lines = host.querySelector('.apexcharts-line-series') as SVGGElement | null;
      if (!container || !lines) return;

      const containerRect = container.getBoundingClientRect();
      const linesRect = lines.getBoundingClientRect();
      if (!linesRect.height) return;

      this.plotTop.set(linesRect.top - containerRect.top);
      this.plotHeight.set(linesRect.height);
    });
  }

  /** Vertikální pozice bubliny v px v rámci chart containeru */
  bubbleTop(topPercent: number): number {
    return this.plotTop() + (topPercent / 100) * this.plotHeight();
  }

  // ============ PUBLIC METHODS ============

  formatValueWithUnit(value: number): string {
    const formatted = this.dateTimeService.formatNumber(value, 0);
    return this.valueUnit ? `${formatted} ${this.valueUnit}` : formatted;
  }

  /** Formát hodnoty v bublině — jednotka + volitelné zkrácení */
  formatBubbleValue(value: number): string {
    const formatted = this.compactValues
      ? this.formatCompact(value)
      : this.dateTimeService.formatNumber(value, 0);
    return this.valueUnit ? `${formatted} ${this.valueUnit}` : formatted;
  }

  /** Zkrácený formát: 1 215 211 → 1,2M; 12 500 → 12,5k; 845 000 → 845k */
  formatCompact(value: number): string {
    const abs = Math.abs(value);
    const shorten = (divisor: number, suffix: string) => {
      const num = this.dateTimeService.formatNumber(value / divisor, 1).replace(/,0$/, '');
      return `${num}${suffix}`;
    };
    if (abs >= 1_000_000_000) return shorten(1_000_000_000, 'B');
    if (abs >= 1_000_000) return shorten(1_000_000, 'M');
    if (abs >= 10_000) return shorten(1_000, 'k');
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

  /** Potlačení ostatních křivek — 50% průhlednost dle specifikace */
  private highlightSeries(activeIndex: number): void {
    if (!this.isBrowser) return;
    const seriesGroups = this.elementRef.nativeElement.querySelectorAll(
      '.apexcharts-line-series .apexcharts-series'
    );

    seriesGroups.forEach((group: SVGGElement, i: number) => {
      if (activeIndex === -1) {
        group.style.removeProperty('opacity');
      } else {
        group.style.opacity = i === activeIndex ? '1' : '0.5';
      }
    });
  }
}

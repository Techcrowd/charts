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

/** Jednotlivá sekce stacked bar grafu */
export interface StackedBarSection {
  name: string;
  value: number;
}

/** Data pro celý graf */
export interface StackedBarChartData {
  sections: StackedBarSection[];
}

// ============ COMPONENT ============

@Component({
  selector: 'co-stacked-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoChartLegendComponent],
  templateUrl: './co-stacked-bar-chart.component.html',
  styleUrls: ['./co-stacked-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoStackedBarChartComponent implements OnInit, OnChanges, OnDestroy {
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
  @Input() data: StackedBarChartData = { sections: [] };

  /** Výška sekce je dle specifikace fixní 32 px */
  readonly barHeight = 32;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit hodnoty v sekcích */
  @Input() showSectionValues = true;

  /** Zobrazit tooltip při hoveru */
  @Input() showTooltip = false;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'absolute';

  /** Jednotka pro hodnoty (např. '$', '%', 'Kč') */
  @Input() valueUnit?: string;

  /** Zkracovat hodnoty (1 215 211 → 1,2M) */
  @Input() compactValues = false;

  /** Minimální podíl sekce v % šířky baru (ovladatelnost extrémně malých hodnot) */
  @Input() minSectionPercent = 3;

  /** Vlastní barvy (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Loading stav */
  @Input() loading = false;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  /** Počet skeleton sekcí při loading */
  @Input() skeletonSectionCount = 3;

  /** Pole pro skeleton sekce */
  get skeletonSections(): number[] {
    return Array.from({ length: this.skeletonSectionCount }, (_, i) => i);
  }

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na sekci */
  @Output() sectionClick = new EventEmitter<{
    sectionIndex: number;
    name: string;
    value: number;
    percent: number;
  }>();

  /** Emituje při hoveru nad sekcí */
  @Output() sectionHover = new EventEmitter<{
    sectionIndex: number;
    name: string;
    value: number;
    percent: number;
  } | null>();

  // ============ INTERNAL STATE ============

  hoveredSectionIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signals for reactive data
  private dataSignal = signal<StackedBarChartData>({ sections: [] });
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);

  // ============ COMPUTED ============

  /** Pouze nenulové sekce — graf z definice zobrazuje jen nenulové hodnoty */
  visibleSections = computed<StackedBarSection[]>(() =>
    this.dataSignal().sections.filter(s => s.value > 0)
  );

  totalValue = computed<number>(() =>
    this.visibleSections().reduce((sum, s) => sum + s.value, 0)
  );

  /**
   * Vykreslované hodnoty — extrémně malé sekce dostanou minimální šířku
   * (minSectionPercent), aby zůstaly ovladatelné. Skutečné hodnoty se
   * zobrazují v labelech a tooltipu.
   */
  plottedValues = computed<number[]>(() => {
    const sections = this.visibleSections();
    const total = this.totalValue();
    if (!total) return sections.map(() => 0);
    const minValue = (this.minSectionPercent / 100) * total;
    return sections.map(s => Math.max(s.value, minValue));
  });

  chartSeries = computed<ApexAxisChartSeries>(() => {
    const sections = this.visibleSections();
    const plotted = this.plottedValues();
    return sections.map((s, i) => ({
      name: s.name,
      data: [plotted[i]],
    }));
  });

  chartColors = computed(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const colors = this.colorsSignal();
    const count = this.visibleSections().length;

    if (colors?.length) {
      return this.chartColorService.getColorsHex(colors);
    }
    return this.chartColorService.getDefaultColorsHex(count);
  });

  /** Labely sekcí — pozice pravého okraje labelu v % šířky baru */
  sectionLabels = computed<{ text: string; endPercent: number }[]>(() => {
    const sections = this.visibleSections();
    const plotted = this.plottedValues();
    const plottedTotal = plotted.reduce((sum, v) => sum + v, 0);
    if (!plottedTotal) return [];

    let cumulative = 0;
    return sections.map((s, i) => {
      cumulative += plotted[i];
      return {
        text: this.formatSectionValue(s.value),
        endPercent: (cumulative / plottedTotal) * 100,
      };
    });
  });

  legendItems = computed<ChartLegendItem[]>(() => {
    const sections = this.visibleSections();
    const colors = this.chartColors();
    const total = this.totalValue();

    return sections.map((s, i) => ({
      label: s.name,
      value: s.value,
      color: colors[i],
      percent: total ? (s.value / total) * 100 : 0,
    }));
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
  }

  // ============ CLICK HANDLING ============

  /** Pointer kurzor jen pokud konzument napojil (sectionClick) output */
  get hasClickAction(): boolean {
    return this.sectionClick.observed;
  }

  private handleChartClick(event: Event): void {
    if (!this.hasClickAction) return;

    const me = event as MouseEvent;
    let target = me.target as Element;

    // If click hit an overlay (data label, foreignObject), find the bar area underneath
    if (!target.classList.contains('apexcharts-bar-area')) {
      const elements = document.elementsFromPoint(me.clientX, me.clientY);
      const bar = elements.find(el => el.classList.contains('apexcharts-bar-area'));
      if (!bar) return;
      target = bar;
    }

    const sectionIndex = parseInt(target.getAttribute('index') ?? '-1', 10);
    if (sectionIndex < 0) return;

    const section = this.visibleSections()[sectionIndex];
    if (!section) return;

    const total = this.totalValue();
    this.ngZone.run(() => {
      this.sectionClick.emit({
        sectionIndex,
        name: section.name,
        value: section.value,
        percent: total ? (section.value / total) * 100 : 0,
      });
    });
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const self = this;

    this.chartConfig = {
      type: 'bar',
      // ApexCharts přidává ~6px vnitřní padding — kompenzace, aby sekce měla přesně 32px
      height: this.barHeight + 6,
      stacked: true,
      fontFamily: 'inherit',
      sparkline: { enabled: true },
      ...(this.nonce && { nonce: this.nonce }),
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
      events: {
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const { seriesIndex } = config;
          self.hoveredSectionIndex.set(seriesIndex);
          const section = self.visibleSections()[seriesIndex];
          if (!section) return;
          const total = self.totalValue();
          self.sectionHover.emit({
            sectionIndex: seriesIndex,
            name: section.name,
            value: section.value,
            percent: total ? (section.value / total) * 100 : 0,
          });
        },
        dataPointMouseLeave: () => {
          self.hoveredSectionIndex.set(-1);
          self.sectionHover.emit(null);
        },
      },
    };

    this.plotOptionsConfig = {
      bar: {
        horizontal: true,
        barHeight: '100%',
        // Vnější rohy (první sekce vlevo, poslední vpravo) zaobluje SVG clip-path
        borderRadius: 0,
      },
    };

    // Hodnoty renderujeme vlastním HTML overlayem (Apex pozicuje labely
    // u stacked barů nekonzistentně) — viz sectionLabels()
    this.dataLabelsConfig = { enabled: false };

    this.tooltipConfig = {
      enabled: this.showTooltip,
      shared: false,
      intersect: true,
      followCursor: false,
      custom: ({ seriesIndex }: any) => {
        const section = this.visibleSections()[seriesIndex];
        if (!section) return '';
        const unit = this.valueUnit ? ` ${this.valueUnit}` : '';
        return `
          <div class="co-stacked-bar-tooltip">
            <div class="co-stacked-bar-tooltip__name">${section.name}</div>
            <div class="co-stacked-bar-tooltip__value">${this.formatValue(section.value)}${unit}</div>
          </div>
        `;
      },
    };

    // Single stacked bar — no axes, no grid
    // max = součet hodnot, jinak Apex zaokrouhlí osu nahoru a bar nevyplní šířku
    const plottedTotal = this.plottedValues().reduce((sum, v) => sum + v, 0);
    this.xAxisConfig = {
      categories: [''],
      min: 0,
      max: plottedTotal || undefined,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    };

    this.yAxisConfig = {
      show: false,
    };

    this.gridConfig = {
      show: false,
      padding: { top: 0, bottom: 0, left: 0, right: 0 },
    };

    // Bílé oddělení mezi sekcemi
    this.strokeConfig = {
      show: true,
      width: 2,
      colors: [CHART_COLORS.backgroundSurface],
    };
  }

  // ============ PUBLIC METHODS ============

  /** Formát hodnoty v sekci — absolutní/procentní, jednotka, zkrácení */
  formatSectionValue(value: number): string {
    if (this.valueFormat === 'percent') {
      const total = this.totalValue();
      const percent = total ? (value / total) * 100 : 0;
      return `${this.dateTimeService.formatNumber(percent, percent < 10 ? 1 : 0)} %`;
    }
    const formatted = this.compactValues ? this.formatCompact(value) : this.formatValue(value);
    return this.valueUnit ? `${formatted} ${this.valueUnit}` : formatted;
  }

  formatValue(value: number): string {
    return this.dateTimeService.formatNumber(value, 0);
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
    this.hoveredSectionIndex.set(index);
    this.isLegendHover.set(true);
    this.highlightSection(index);
  }

  onLegendItemLeave(): void {
    this.hoveredSectionIndex.set(-1);
    this.isLegendHover.set(false);
    this.highlightSection(-1);
  }

  onLegendItemClick(index: number): void {
    const section = this.visibleSections()[index];
    if (section) {
      const total = this.totalValue();
      this.sectionClick.emit({
        sectionIndex: index,
        name: section.name,
        value: section.value,
        percent: total ? (section.value / total) * 100 : 0,
      });
    }
  }

  /** Potlačení ostatních sekcí — dle specifikace 50% průhlednost */
  private highlightSection(activeIndex: number): void {
    if (!this.isBrowser) return;
    const seriesGroups = this.elementRef.nativeElement.querySelectorAll('.apexcharts-series');

    seriesGroups.forEach((group: SVGGElement, i: number) => {
      if (activeIndex === -1) {
        group.style.removeProperty('opacity');
      } else {
        group.style.opacity = i === activeIndex ? '1' : '0.5';
      }
    });
  }
}

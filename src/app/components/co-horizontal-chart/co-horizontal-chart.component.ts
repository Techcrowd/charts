import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
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
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { DateTimeService } from '../../services/date-time.service';
import { CoIconComponent } from '../co-icon/co-icon.component';
import { CHART_COLORS, CHART_STATES_CONFIG, CHART_LEGEND_CONFIG } from '../../shared/chart-types';

// ============ TYPES ============

// Re-export types for consumers of this component
export { ChartColor } from '../../services/chart-color.service';

/** Varianta horizontálního grafu — dle Figma CO Chart v4.0 */
export type HorizontalChartVariant = 'account' | 'savings' | 'investments';

/** Řádek varianty account — příchozí/odchozí platby */
export interface HorizontalAccountItem {
  label: string;
  value: number;
  /** Směr toku: in = příchozí (zelená, šipka vlevo), out = odchozí (tmavá, šipka vpravo) */
  direction: 'in' | 'out';
  /** Maximum pro výpočet šířky výplně; default = nejvyšší hodnota v seznamu */
  max?: number;
}

/** Data varianty savings — průběh spoření vůči cíli */
export interface HorizontalSavingsData {
  label: string;
  value: number;
  maxLabel: string;
  maxValue: number;
}

/** Sekce varianty investments — podíl na celku */
export interface HorizontalInvestmentsSection {
  name: string;
  value: number;
}

/** Kompletní data jednoho account řádku pro šablonu (Apex série + meta) */
interface AccountRowChart {
  label: string;
  value: number;
  direction: 'in' | 'out';
  colorHex: string;
  series: ApexAxisChartSeries;
  colors: string[];
  xaxis: ApexXAxis;
}

// ============ COMPONENT ============

@Component({
  selector: 'co-horizontal-chart',
  standalone: true,
  imports: [NgApexchartsModule, CoIconComponent],
  templateUrl: './co-horizontal-chart.component.html',
  styleUrls: ['./co-horizontal-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoHorizontalChartComponent implements OnInit, OnChanges {
  // ============ INJECTED ============
  private chartColorService = inject(ChartColorService);
  private dateTimeService = inject(DateTimeService);

  // ============ INPUTS ============

  /** Varianta grafu */
  @Input({ required: true }) variant: HorizontalChartVariant = 'account';

  /** Řádky pro variantu account */
  @Input() accountItems: HorizontalAccountItem[] = [];

  /** Data pro variantu savings */
  @Input() savingsData?: HorizontalSavingsData;

  /** Sekce pro variantu investments */
  @Input() sections: HorizontalInvestmentsSection[] = [];

  /** Vlastní barvy sekcí investments (pouze z povolené palety 10 barev) */
  @Input() colors?: ChartColor[];

  /** Jednotka pro hodnoty (např. '$', '%', 'Kč') */
  @Input() valueUnit?: string;

  /** Zkracovat hodnoty (1 215 211 → 1,2M) */
  @Input() compactValues = false;

  /** Minimální podíl sekce investments v % šířky baru */
  @Input() minSectionPercent = 3;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  /** Loading stav — skeleton dle varianty */
  @Input() loading = false;

  /** Počet skeleton řádků u varianty account */
  @Input() skeletonRowCount = 2;

  // ============ GEOMETRY ============

  /** Výška baru account/savings je dle specifikace 8 px */
  readonly thinBarHeight = 8;

  /** Výška segmentu investments je 16 px, na hover roste na 24 px */
  readonly investmentsBarHeight = 16;
  readonly investmentsHoverHeight = 24;

  /** ApexCharts přidává ~6px vnitřní padding (viz co-stacked-bar-chart) */
  private readonly apexPadding = 6;

  /** Výška canvasu tenkých barů */
  readonly thinChartHeight = this.thinBarHeight + this.apexPadding;

  /**
   * Výška canvasu investments — slot má výšku hover stavu (24 px), aby zvětšený
   * segment nebyl oříznutý; klidový bar 16 px vykreslí barHeight 66.67 %.
   */
  readonly investmentsChartHeight = this.investmentsHoverHeight + this.apexPadding;

  get skeletonRows(): number[] {
    return Array.from({ length: this.skeletonRowCount }, (_, i) => i);
  }

  // ============ INTERNAL STATE ============

  private accountItemsSignal = signal<HorizontalAccountItem[]>([]);
  private savingsSignal = signal<HorizontalSavingsData | undefined>(undefined);
  private sectionsSignal = signal<HorizontalInvestmentsSection[]>([]);
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);

  // ============ COMPUTED — ACCOUNT ============

  /** Account řádky — každý má vlastní jednořadý Apex bar s šedým track pozadím */
  accountCharts = computed<AccountRowChart[]>(() => {
    const items = this.accountItemsSignal();
    const maxValue = Math.max(...items.map(i => i.max ?? i.value), 0);

    return items.map(item => {
      const colorHex = this.chartColorService.getColorHex(
        item.direction === 'in' ? 'chart-in' : 'chart-out'
      );
      return {
        label: item.label,
        value: item.value,
        direction: item.direction,
        colorHex,
        series: [{ name: item.label, data: [item.value] }],
        colors: [colorHex],
        xaxis: this.buildHiddenXAxis(item.max ?? maxValue),
      };
    });
  });

  // ============ COMPUTED — SAVINGS ============

  savingsSeries = computed<ApexAxisChartSeries>(() => {
    const data = this.savingsSignal();
    return [{ name: data?.label ?? '', data: [data?.value ?? 0] }];
  });

  savingsColors = computed<string[]>(() => [this.chartColorService.getColorHex('chart-out')]);

  savingsXAxis = computed<ApexXAxis>(() =>
    this.buildHiddenXAxis(this.savingsSignal()?.maxValue ?? 0)
  );

  // ============ COMPUTED — INVESTMENTS ============

  /** Pouze nenulové sekce — graf z definice zobrazuje jen nenulové hodnoty */
  visibleSections = computed<HorizontalInvestmentsSection[]>(() =>
    this.sectionsSignal().filter(s => s.value > 0)
  );

  totalValue = computed<number>(() =>
    this.visibleSections().reduce((sum, s) => sum + s.value, 0)
  );

  /**
   * Vykreslované hodnoty — extrémně malé sekce dostanou minimální šířku
   * (minSectionPercent), aby zůstaly viditelné.
   */
  private plottedValues = computed<number[]>(() => {
    const sections = this.visibleSections();
    const total = this.totalValue();
    if (!total) return sections.map(() => 0);
    const minValue = (this.minSectionPercent / 100) * total;
    return sections.map(s => Math.max(s.value, minValue));
  });

  investmentsSeries = computed<ApexAxisChartSeries>(() => {
    const sections = this.visibleSections();
    const plotted = this.plottedValues();
    return sections.map((s, i) => ({ name: s.name, data: [plotted[i]] }));
  });

  investmentsColors = computed<string[]>(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const customColors = this.colorsSignal();
    const count = this.visibleSections().length;

    if (customColors?.length) {
      return this.chartColorService.getColorsHex(customColors);
    }
    return this.chartColorService.getDefaultColorsHex(count);
  });

  investmentsXAxis = computed<ApexXAxis>(() => {
    // max = součet hodnot, jinak Apex zaokrouhlí osu nahoru a bar nevyplní šířku
    const plottedTotal = this.plottedValues().reduce((sum, v) => sum + v, 0);
    return this.buildHiddenXAxis(plottedTotal);
  });

  // ============ CHART CONFIGS ============

  chartConfigThin!: ApexChart;
  chartConfigInvestments!: ApexChart;
  plotOptionsThin!: ApexPlotOptions;
  plotOptionsInvestments!: ApexPlotOptions;
  strokeConfigThin!: ApexStroke;
  strokeConfigInvestments!: ApexStroke;

  readonly dataLabelsConfig: ApexDataLabels = { enabled: false };
  readonly tooltipConfig: ApexTooltip = { enabled: false };
  readonly yAxisConfig: ApexYAxis = { show: false };
  readonly gridConfig: ApexGrid = {
    show: false,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  };
  readonly fillConfig: ApexFill = { opacity: 1 };
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
    this.accountItemsSignal.set(this.accountItems);
    this.savingsSignal.set(this.savingsData);
    this.sectionsSignal.set(this.sections);
    this.colorsSignal.set(this.colors);
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const baseChart: Partial<ApexChart> = {
      type: 'bar',
      fontFamily: 'inherit',
      sparkline: { enabled: true },
      ...(this.nonce && { nonce: this.nonce }),
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
      },
    };

    this.chartConfigThin = {
      ...baseChart,
      type: 'bar',
      height: this.thinChartHeight,
    };

    this.chartConfigInvestments = {
      ...baseChart,
      type: 'bar',
      height: this.investmentsChartHeight,
      stacked: true,
    };

    // Tenký bar (account/savings) — pill zaoblení + šedý track přes backgroundBar
    this.plotOptionsThin = {
      bar: {
        horizontal: true,
        barHeight: '100%',
        borderRadius: this.thinBarHeight / 2,
        borderRadiusApplication: 'around',
        colors: {
          backgroundBarColors: [CHART_COLORS.backgroundBorder],
          backgroundBarRadius: this.thinBarHeight / 2,
        },
      },
    };

    // Investments — klidový segment 16 px ve slotu 24 px (prostor pro hover růst)
    this.plotOptionsInvestments = {
      bar: {
        horizontal: true,
        barHeight: `${(this.investmentsBarHeight / this.investmentsHoverHeight) * 100}%`,
        borderRadius: 2,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
      },
    };

    this.strokeConfigThin = { show: false };

    // Bílé oddělení mezi segmenty (stejně jako co-stacked-bar-chart)
    this.strokeConfigInvestments = {
      show: true,
      width: 2,
      colors: [CHART_COLORS.backgroundSurface],
    };
  }

  /** Skrytá osa X s pevným rozsahem 0..max */
  private buildHiddenXAxis(max: number): ApexXAxis {
    return {
      categories: [''],
      min: 0,
      max: max || undefined,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    };
  }

  // ============ FORMATTING ============

  /** Formát hodnoty — jednotka + volitelné zkrácení */
  formatValue(value: number): string {
    const formatted = this.compactValues
      ? this.formatCompact(value)
      : this.dateTimeService.formatNumber(value, 0);
    return this.valueUnit ? `${formatted} ${this.valueUnit}` : formatted;
  }

  /** Zkrácený formát: 1 215 211 → 1,2M; 12 500 → 12,5k; 845 000 → 845k */
  private formatCompact(value: number): string {
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
}

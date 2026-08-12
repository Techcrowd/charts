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
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { DateTimeService } from '../../services/date-time.service';
import { CoIconComponent } from '../co-icon/co-icon.component';

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

// ============ COMPONENT ============

@Component({
  selector: 'co-horizontal-chart',
  standalone: true,
  imports: [CoIconComponent],
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

  /** Loading stav — skeleton dle varianty */
  @Input() loading = false;

  /** Počet skeleton řádků u varianty account */
  @Input() skeletonRowCount = 2;

  // ============ INTERNAL STATE ============

  private accountItemsSignal = signal<HorizontalAccountItem[]>([]);
  private savingsSignal = signal<HorizontalSavingsData | undefined>(undefined);
  private sectionsSignal = signal<HorizontalInvestmentsSection[]>([]);
  private colorsSignal = signal<ChartColor[] | undefined>(undefined);

  get skeletonRows(): number[] {
    return Array.from({ length: this.skeletonRowCount }, (_, i) => i);
  }

  // ============ COMPUTED — ACCOUNT ============

  /** Řádky account s vypočtenou šířkou výplně a barvou */
  accountRows = computed(() => {
    const items = this.accountItemsSignal();
    const maxValue = Math.max(...items.map(i => i.max ?? i.value), 0);
    return items.map(item => {
      const max = item.max ?? maxValue;
      return {
        ...item,
        fillPercent: max ? Math.min((item.value / max) * 100, 100) : 0,
        colorHex: this.chartColorService.getColorHex(
          item.direction === 'in' ? 'chart-in' : 'chart-out'
        ),
      };
    });
  });

  // ============ COMPUTED — SAVINGS ============

  savingsFillPercent = computed(() => {
    const data = this.savingsSignal();
    if (!data?.maxValue) return 0;
    return Math.min((data.value / data.maxValue) * 100, 100);
  });

  savingsFillColor = computed(() => this.chartColorService.getColorHex('chart-out'));

  // ============ COMPUTED — INVESTMENTS ============

  /** Pouze nenulové sekce — graf z definice zobrazuje jen nenulové hodnoty */
  visibleSections = computed<HorizontalInvestmentsSection[]>(() =>
    this.sectionsSignal().filter(s => s.value > 0)
  );

  totalValue = computed<number>(() =>
    this.visibleSections().reduce((sum, s) => sum + s.value, 0)
  );

  /** Segmenty s šířkou v % (extrémně malé sekce dostanou minSectionPercent) a barvou */
  investmentSegments = computed(() => {
    const sections = this.visibleSections();
    const total = this.totalValue();
    if (!total) return [];

    const minValue = (this.minSectionPercent / 100) * total;
    const plotted = sections.map(s => Math.max(s.value, minValue));
    const plottedTotal = plotted.reduce((sum, v) => sum + v, 0);

    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const customColors = this.colorsSignal();
    const colorsHex = customColors?.length
      ? this.chartColorService.getColorsHex(customColors)
      : this.chartColorService.getDefaultColorsHex(sections.length);

    return sections.map((s, i) => ({
      name: s.name,
      value: s.value,
      widthPercent: (plotted[i] / plottedTotal) * 100,
      colorHex: colorsHex[i],
    }));
  });

  // ============ LIFECYCLE ============

  ngOnInit(): void {
    this.syncSignals();
  }

  ngOnChanges(): void {
    this.syncSignals();
  }

  private syncSignals(): void {
    this.accountItemsSignal.set(this.accountItems);
    this.savingsSignal.set(this.savingsData);
    this.sectionsSignal.set(this.sections);
    this.colorsSignal.set(this.colors);
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

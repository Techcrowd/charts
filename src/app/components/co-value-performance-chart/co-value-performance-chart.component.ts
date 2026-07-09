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
  ApexAnnotations,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartColorService, ChartColor } from '../../services/chart-color.service';
import { DateTimeService } from '../../services/date-time.service';
import { CoChartLegendComponent, ChartLegendItem } from '../co-chart-legend/co-chart-legend.component';
import {
  CHART_COLORS,
  CHART_STATES_CONFIG,
  CHART_LEGEND_CONFIG,
} from '../../shared/chart-types';

// ============ TYPES ============

export { ChartColor } from '../../services/chart-color.service';

/** Typ křivky */
export type CurveType = 'smooth' | 'straight' | 'stepline';

/** Datový bod pro čáru grafu */
export interface ChartDataPoint {
  x: Date | number | string;
  y: number;
}

/** Konfigurace jedné čáry grafu - obsahuje definici i data */
export interface ChartLine {
  /** Název čáry (zobrazí se v legendě a tooltipu) */
  name: string;

  /** Barva čáry z palety */
  color: ChartColor;

  /** Typ křivky */
  curveType: CurveType;

  /** Průhlednost výplně gradientu (0-1). Default: 0.5 */
  fillOpacity?: number;

  /** Pro layered gradienty - čáry se stackují na sebe. Default: false */
  stacked?: boolean;

  /** Data pro tuto čáru */
  data: ChartDataPoint[];
}

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
  private dateTimeService = inject(DateTimeService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ============ INPUTS ============

  /** Výška grafu v px */
  @Input() height = 300;

  /**
   * Pole čar pro vykreslení.
   * Každá čára obsahuje svou definici (název, barva, typ křivky) i data.
   */
  @Input() lines: ChartLine[] = [];

  /** Zobrazit vysokou/nízkou hodnotu */
  @Input() showHighLowValues = true;

  /** Zobrazit legendu */
  @Input() showLegend = false;

  /** Zobrazit tooltip */
  @Input() showTooltip = false;

  /** Zobrazit mřížku */
  @Input() showGrid = false;

  /** Minimální hodnota osy X (pro neúplné intervaly) */
  @Input() xAxisMin?: Date | number | string;

  /** Maximální hodnota osy X (pro neúplné intervaly - osa pokračuje za data) */
  @Input() xAxisMax?: Date | number | string;

  /** Zobrazit Y osu */
  @Input() showYAxis = false;

  /** Jednotka hodnoty (měna) */
  @Input() valueUnit = '';

  /** Formát datumu (dd = den, MM = měsíc, MMM = měsíc slovně, yyyy = rok, HH = hodina, mm = minuta) */
  @Input() dateFormat = 'dd.MM.yyyy';

  /** Loading stav */
  @Input() loading = false;

  /** CSP nonce pro inline styly */
  @Input() nonce?: string;

  // ============ OUTPUTS ============

  /** Emituje při hoveru nad bodem - obsahuje hodnoty ze všech čar */
  @Output() pointHover = new EventEmitter<{
    timestamp: Date | number | string;
    values: { name: string; value: number }[];
  } | null>();

  /** Emituje při kliknutí na bod */
  @Output() pointClick = new EventEmitter<{
    timestamp: Date | number | string;
    values: { name: string; value: number }[];
  }>();

  // ============ INTERNAL STATE ============

  hoveredSeriesIndex = signal(-1);
  isLegendHover = signal(false);

  // Internal signal for reactive data
  private linesSignal = signal<ChartLine[]>([]);

  // Computed: resolve colors for each line from palette
  chartColors = computed(() => {
    // Read colorVersion to react to theme changes
    this.chartColorService.getColorVersion()();
    const lines = this.linesSignal();

    return lines.map(line => this.chartColorService.getColorHex(line.color));
  });

  // Computed: active line configs (only lines that have data)
  activeLines = computed(() => {
    const lines = this.linesSignal();
    return lines.filter(line => line.data && line.data.length > 0);
  });

  // Computed: check if we should use stacked mode (lines with stacked: true)
  hasStackedLines = computed(() => {
    const lines = this.activeLines();
    const stackedLines = lines.filter(l => l.stacked);
    // Need at least 2 stacked lines for stacking to make sense
    return stackedLines.length >= 2;
  });

  // Computed: series data for ApexCharts
  chartSeries = computed<ApexAxisChartSeries>(() => {
    const lines = this.activeLines();
    const series: ApexAxisChartSeries = [];
    const isStacked = this.hasStackedLines();

    if (isStacked && lines.length >= 2) {
      // STACKED MODE: For layered gradients
      // First line is the base (renders from x-axis)
      // Second line shows the difference for proper stacking
      const baseLine = lines[0];
      const topLine = lines[1];

      // Base series (bottom layer)
      const baseData = baseLine.data.map(p => ({
        x: new Date(p.x).getTime(),
        y: p.y,
      }));
      series.push({ name: baseLine.name, data: baseData });

      // Difference series (stacked on top)
      // We need to match points by x value
      const baseMap = new Map(baseLine.data.map(p => [new Date(p.x).getTime(), p.y]));
      const diffData = topLine.data
        .filter(p => baseMap.has(new Date(p.x).getTime()))
        .map(p => {
          const x = new Date(p.x).getTime();
          const baseY = baseMap.get(x) ?? 0;
          return { x, y: p.y - baseY };
        });
      series.push({ name: topLine.name, data: diffData });

      // Add any remaining non-stacked lines
      lines.slice(2).filter(l => !l.stacked).forEach(line => {
        const lineData = line.data.map(p => ({
          x: new Date(p.x).getTime(),
          y: p.y,
        }));
        series.push({ name: line.name, data: lineData });
      });
    } else {
      // NON-STACKED MODE: render each line independently
      lines.forEach(line => {
        const lineData = line.data.map(p => ({
          x: new Date(p.x).getTime(),
          y: p.y,
        }));
        series.push({ name: line.name, data: lineData });
      });
    }

    return series;
  });

  // Computed: legend items
  legendItems = computed<ChartLegendItem[]>(() => {
    const colors = this.chartColors();
    const lines = this.activeLines();
    const items: ChartLegendItem[] = [];

    lines.forEach((line, index) => {
      const lastPoint = line.data[line.data.length - 1];
      const value = lastPoint?.y ?? 0;
      items.push({
        label: line.name,
        value,
        color: colors[index],
        percent: 0,
      });
    });

    return items;
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
  // Chart configs (static) - use shared constants
  readonly statesConfig = CHART_STATES_CONFIG;
  readonly legendConfig = CHART_LEGEND_CONFIG;

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
    this.linesSignal.set(this.lines);
  }

  // ============ PRIVATE METHODS ============

  private updateChartConfigs(): void {
    const self = this;
    const colors = this.chartColors();
    const lines = this.activeLines();
    const isStacked = this.hasStackedLines();

    // Build ordered arrays for chart config
    const orderedCurves = lines.map(line => line.curveType);
    let orderedOpacityFrom: number[];
    let orderedOpacityTo: number[];

    if (isStacked && lines.length >= 2) {
      // For stacked mode, use specific opacities for clearer separation
      orderedOpacityFrom = lines.map((line, i) => i === 0 ? 0.3 : 0.5);
      orderedOpacityTo = lines.map((line, i) => i === 0 ? 0.05 : 0.1);
    } else {
      // Non-stacked: use fillOpacity from config
      orderedOpacityFrom = lines.map(line => line.fillOpacity ?? 0.5);
      orderedOpacityTo = lines.map(line => (line.fillOpacity ?? 0.5) * 0.1);
    }

    this.chartConfig = {
      type: 'area',
      height: this.height,
      fontFamily: 'inherit',
      stacked: isStacked, // Enable stacking when both lines present
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
        dynamicAnimation: {
          enabled: false,
        },
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const { dataPointIndex } = config;
          const currentLines = self.activeLines();
          const firstPoint = currentLines[0]?.data[dataPointIndex];
          if (firstPoint) {
            const values = currentLines.map(line => ({
              name: line.name,
              value: line.data[dataPointIndex]?.y ?? 0,
            }));
            self.pointClick.emit({
              timestamp: firstPoint.x,
              values,
            });
          }
        },
        mouseLeave: () => {
          self.hoveredSeriesIndex.set(-1);
          self.pointHover.emit(null);
        },
      },
    };

    // Build stroke config - use ordered curves for stacked mode
    this.strokeConfig = {
      curve: orderedCurves,
      width: orderedCurves.map(() => 1), // 1px lines
      lineCap: 'round', // Smoother line endings
      dashArray: orderedCurves.map(() => 0), // all solid lines
    };

    // Build fill config - use ordered opacities for stacked mode
    this.fillConfig = {
      type: orderedCurves.map(() => 'gradient'),
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        opacityFrom: orderedOpacityFrom,
        opacityTo: orderedOpacityTo,
        stops: [0, 100],
      },
      opacity: orderedCurves.map(() => 1),
    };

    this.markersConfig = {
      size: 0, // Hidden by default
      strokeWidth: 2,
      strokeColors: '#ADADAD',
      hover: {
        size: 4, // 8px diameter = 4px radius
        sizeOffset: 0,
      },
    };

    // Calculate x-axis range from all lines' data
    // Collect all x values from all lines to determine range
    const allXValues: number[] = [];
    lines.forEach(line => {
      line.data.forEach(p => allXValues.push(new Date(p.x).getTime()));
    });
    allXValues.sort((a, b) => a - b);

    // Get first and last timestamps
    const firstTimestamp = allXValues.length > 0 ? allXValues[0] : undefined;
    const lastDataTimestamp = allXValues.length > 0 ? allXValues[allXValues.length - 1] : undefined;

    // Use explicit min/max if provided, otherwise use data range
    const xMin = this.xAxisMin ? new Date(this.xAxisMin).getTime() : firstTimestamp;
    const xMax = this.xAxisMax ? new Date(this.xAxisMax).getTime() : lastDataTimestamp;

    // Threshold for considering a timestamp as "edge" (within 5% of range)
    const range = (xMax ?? 0) - (xMin ?? 0);
    const edgeThreshold = range * 0.1;

    this.xAxisConfig = {
      crosshairs: {
        show: true,
        width: 1,
        stroke: {
          color: '#ADADAD',
          width: 1,
          dashArray: 0,
        },
      },
      type: 'datetime',
      min: xMin,
      max: xMax,
      tickAmount: 5,
      labels: {
        style: {
          colors: CHART_COLORS.contentTertiary,
          fontSize: '10px',
          fontWeight: 400, // caption-secondary
        },
        datetimeUTC: false,
        rotate: 0,
        rotateAlways: false,
        showDuplicates: false,
        hideOverlappingLabels: true,
        formatter: (value: string, timestamp?: number) => {
          const ts = timestamp ?? parseInt(value, 10);
          if (isNaN(ts)) return '';

          // Hide labels that are too close to the edges (we use annotations for those)
          if (xMin && xMax) {
            const distFromStart = Math.abs(ts - xMin);
            const distFromEnd = Math.abs(ts - xMax);
            if (distFromStart < edgeThreshold || distFromEnd < edgeThreshold) {
              return ''; // Hide - we show these via annotations
            }
          }

          const date = new Date(ts);
          return this.formatDate(date);
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
      show: this.showGrid,
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
      enabled: true, // Always enabled for hover detection
      shared: true,
      intersect: false,
      fixed: {
        enabled: false,
        position: 'topRight',
      },
      marker: {
        show: true,
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        // Get the first line's point for timestamp reference
        const firstLine = lines[0];
        const firstPoint = firstLine?.data[dataPointIndex];
        if (!firstPoint) return '';

        // Emit hover event with values from all lines
        this.hoveredSeriesIndex.set(dataPointIndex);
        const values = lines.map(line => ({
          name: line.name,
          value: line.data[dataPointIndex]?.y ?? 0,
        }));
        this.pointHover.emit({
          timestamp: firstPoint.x,
          values,
        });

        // Return empty string if tooltip is disabled
        if (!this.showTooltip) {
          return '<div style="display:none"></div>';
        }

        const date = new Date(firstPoint.x);
        const formattedDate = this.formatDate(date);
        const unit = this.valueUnit ? ` ${this.valueUnit}` : '';

        let html = `
          <div class="co-value-performance-tooltip">
            <div class="co-value-performance-tooltip__header">${formattedDate}</div>
        `;

        // Add a row for each configured line
        lines.forEach((line, index) => {
          const lineColor = colors[index];
          const point = line.data[dataPointIndex];
          const val = point?.y;

          if (val !== undefined) {
            html += `
              <div class="co-value-performance-tooltip__row">
                <span class="co-value-performance-tooltip__dot" style="background-color: ${lineColor}"></span>
                <span class="co-value-performance-tooltip__label">${line.name}</span>
                <span class="co-value-performance-tooltip__value">${this.formatValue(val)}${unit}</span>
              </div>
            `;
          }
        });

        html += '</div>';
        return html;
      },
    };

    this.dataLabelsConfig = {
      enabled: false,
    };

    // Build all annotations
    const annotations: ApexAnnotations = { yaxis: [], points: [], xaxis: [] };

    if (allXValues.length > 0) {
      const firstTs = xMin!;
      const lastTs = xMax!;

      // === X-AXIS LABELS (first and last) ===
      // First date label - aligned to left
      annotations.xaxis!.push({
        x: firstTs,
        borderColor: 'transparent',
        label: {
          text: this.formatDate(new Date(firstTs)),
          borderColor: 'transparent',
          textAnchor: 'start',
          style: {
            background: 'transparent',
            color: CHART_COLORS.contentTertiary,
            fontSize: '10px',
            fontWeight: 400, // caption-secondary
            fontFamily: 'inherit',
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
          },
          position: 'bottom',
          orientation: 'horizontal',
          offsetX: 0,
          offsetY: 25,
        },
      });

      // Last date label - aligned to right, with negative offset to stay inside
      annotations.xaxis!.push({
        x: lastTs,
        borderColor: 'transparent',
        label: {
          text: this.formatDate(new Date(lastTs)),
          borderColor: 'transparent',
          textAnchor: 'end',
          style: {
            background: 'transparent',
            color: CHART_COLORS.contentTertiary,
            fontSize: '10px',
            fontWeight: 400, // caption-secondary
            fontFamily: 'inherit',
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
          },
          position: 'bottom',
          orientation: 'horizontal',
          offsetX: -5,
          offsetY: 25,
        },
      });

      // === MAX/MIN VALUE LABELS ===
      if (this.showHighLowValues) {
        let absMax = -Infinity;
        let absMin = Infinity;

        // Find min/max across all lines
        lines.forEach(line => {
          line.data.forEach(p => {
            if (p.y > absMax) absMax = p.y;
            if (p.y < absMin) absMin = p.y;
          });
        });

        // Position labels at the END of the chart (xMax), not at last data point
        // Max label - top right
        annotations.points!.push({
          x: lastTs,
          y: absMax,
          marker: { size: 0 },
          label: {
            text: this.formatValue(absMax),
            borderColor: '#E5E7EB',
            borderWidth: 1,
            borderRadius: 4,
            position: 'left',
            textAnchor: 'end',
            style: {
              background: '#FFFFFF',
              color: CHART_COLORS.contentTertiary,
              fontSize: '10px',
              fontWeight: 400,
              padding: { left: 6, right: 6, top: 3, bottom: 3 },
            },
            offsetX: -5,
            offsetY: 4,
          },
        });

        // Min label - bottom right
        annotations.points!.push({
          x: lastTs,
          y: absMin,
          marker: { size: 0 },
          label: {
            text: this.formatValue(absMin),
            borderColor: '#E5E7EB',
            borderWidth: 1,
            borderRadius: 4,
            position: 'left',
            textAnchor: 'end',
            style: {
              background: '#FFFFFF',
              color: CHART_COLORS.contentTertiary,
              fontSize: '10px',
              fontWeight: 400,
              padding: { left: 6, right: 6, top: 3, bottom: 3 },
            },
            offsetX: -5,
            offsetY: 4,
          },
        });
      }
    }

    this.annotationsConfig = annotations;
  }

  // ============ PUBLIC METHODS ============

  formatValue(value: number): string {
    return this.dateTimeService.formatNumber(value);
  }

  formatDate(date: Date): string {
    return this.dateTimeService.formatDate(date, this.dateFormat);
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
}

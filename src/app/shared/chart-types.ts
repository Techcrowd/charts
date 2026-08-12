import {
  ApexStates,
  ApexLegend,
  ApexStroke,
} from 'ng-apexcharts';

/** Formát hodnot v grafech a legendě */
export type ValueFormat = 'absolute' | 'percent';

/** Design token barvy pro grafy */
export const CHART_COLORS = {
  contentTertiary: '#717171',
  contentSecondary: '#454545',
  backgroundSurface: '#ffffff',
  backgroundBorder: '#dadada',
  gridBorder: '#e5e7eb',
} as const;

// ============ SHARED APEX CONFIGS ============

/** Sdílená konfigurace states - vypnutí hover/active filtrů */
export const CHART_STATES_CONFIG: ApexStates = {
  hover: { filter: { type: 'none' } },
  active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } },
};

/** Sdílená konfigurace legendy - skrytá (používáme vlastní) */
export const CHART_LEGEND_CONFIG: ApexLegend = { show: false };

/** Sdílená konfigurace stroke pro donut */
export const CHART_DONUT_STROKE_CONFIG: ApexStroke = {
  show: true,
  width: 2,
  colors: [CHART_COLORS.backgroundSurface],
};

// ============ SHARED UTILITIES ============

/**
 * Zvýrazní sérii v grafu podle indexu.
 * Používá se pro legend hover interakci.
 * @param hostEl - Host element komponenty
 * @param activeIndex - Index aktivní série (-1 = reset)
 * @param selector - CSS selector pro série (default: '.apexcharts-series')
 */
export function highlightChartSeries(
  hostEl: HTMLElement,
  activeIndex: number,
  selector = '.apexcharts-series'
): void {
  const seriesGroups = hostEl.querySelectorAll(selector);

  seriesGroups.forEach((group, i) => {
    const el = group as SVGGElement;
    if (activeIndex === -1) {
      el.style.removeProperty('opacity');
    } else {
      el.style.opacity = i === activeIndex ? '1' : '0.35';
    }
  });
}

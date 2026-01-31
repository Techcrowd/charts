/** Formát hodnot v grafech a legendě */
export type ValueFormat = 'absolute' | 'percent';

/** Velikostní varianta */
export type ChartSize = 'sm' | 'md' | 'lg';

/** Design token barvy pro grafy */
export const CHART_COLORS = {
  contentTertiary: '#717171',
  contentSecondary: '#454545',
  backgroundSurface: '#ffffff',
} as const;

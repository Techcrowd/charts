import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ============ TYPES ============

/** Povolené barvy grafu - pouze těchto 10 barev je možné použít */
export type ChartColor =
  | 'chart-in'
  | 'chart-out'
  | 'chart-funds'
  | 'chart-cool'
  | 'chart-evaluation'
  | 'chart-stocks'
  | 'chart-bonds'
  | 'chart-neon'
  | 'chart-rusty-red'
  | 'chart-orangish';

@Injectable({
  providedIn: 'root',
})
export class ChartColorService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Fallback colors (used if CSS variables not available)
  private readonly fallbackColors: Record<ChartColor, string> = {
    'chart-in': '#267c29',
    'chart-out': '#212121',
    'chart-funds': '#02a473',
    'chart-cool': '#06b6d4',
    'chart-evaluation': '#43167c',
    'chart-stocks': '#f45b6d',
    'chart-bonds': '#4e5571',
    'chart-neon': '#9a2760',
    'chart-rusty-red': '#e26e52',
    'chart-orangish': '#7e472f',
  };

  // Default color order for charts
  readonly defaultColorOrder: ChartColor[] = [
    'chart-rusty-red',
    'chart-funds',
    'chart-stocks',
    'chart-bonds',
    'chart-in',
    'chart-out',
    'chart-cool',
    'chart-evaluation',
    'chart-neon',
    'chart-orangish',
  ];

  // All available colors
  readonly availableColors: ChartColor[] = [
    'chart-in',
    'chart-out',
    'chart-funds',
    'chart-cool',
    'chart-evaluation',
    'chart-stocks',
    'chart-bonds',
    'chart-neon',
    'chart-rusty-red',
    'chart-orangish',
  ];

  // Loaded color hex values from CSS variables
  private colorHexValues: Record<ChartColor, string> = {} as Record<ChartColor, string>;
  private colorsLoaded = false;

  constructor() {
    this.loadColorsFromCssVariables();
  }

  /**
   * Load colors from CSS variables (call once on init)
   */
  loadColorsFromCssVariables(): void {
    if (this.colorsLoaded) return;

    const styles = this.isBrowser ? getComputedStyle(document.documentElement) : null;

    this.availableColors.forEach((colorName) => {
      const value = styles?.getPropertyValue(`--${colorName}`).trim();
      this.colorHexValues[colorName] = value || this.fallbackColors[colorName];
    });

    this.colorsLoaded = true;
  }

  /**
   * Get hex value for a specific chart color
   */
  getColorHex(color: ChartColor): string {
    return this.colorHexValues[color] || this.fallbackColors[color];
  }

  /**
   * Get hex values for an array of chart colors
   */
  getColorsHex(colors: ChartColor[]): string[] {
    return colors.map((color) => this.getColorHex(color));
  }

  /**
   * Get hex values for N colors using default order (cycles if needed)
   */
  getDefaultColorsHex(count: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const colorName = this.defaultColorOrder[i % this.defaultColorOrder.length];
      result.push(this.getColorHex(colorName));
    }
    return result;
  }

  /**
   * Get color at specific index from default order (cycles if needed)
   */
  getColorAtIndex(index: number): ChartColor {
    return this.defaultColorOrder[index % this.defaultColorOrder.length];
  }

  /**
   * Get hex color at specific index from default order (cycles if needed)
   */
  getColorHexAtIndex(index: number): string {
    return this.getColorHex(this.getColorAtIndex(index));
  }

  /**
   * Check if a color name is valid
   */
  isValidColor(color: string): color is ChartColor {
    return this.availableColors.includes(color as ChartColor);
  }

  /**
   * Reload colors from CSS variables (useful if theme changes)
   */
  reloadColors(): void {
    this.colorsLoaded = false;
    this.loadColorsFromCssVariables();
  }
}

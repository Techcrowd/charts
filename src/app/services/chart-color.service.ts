import { Injectable, PLATFORM_ID, inject, signal, computed, DestroyRef } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);
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

  // Signal to track color version (increments on theme change)
  private colorVersion = signal(0);

  // Cached color hex values
  private colorHexCache: Record<ChartColor, string> = {} as Record<ChartColor, string>;

  // Mutation observer for theme changes
  private mutationObserver?: MutationObserver;

  constructor() {
    this.loadColorsFromCssVariables();
    this.setupThemeChangeListener();
  }

  /**
   * Load colors from CSS variables
   */
  private loadColorsFromCssVariables(): void {
    const styles = this.isBrowser ? getComputedStyle(document.documentElement) : null;

    this.availableColors.forEach((colorName) => {
      const value = styles?.getPropertyValue(`--${colorName}`).trim();
      this.colorHexCache[colorName] = value || this.fallbackColors[colorName];
    });
  }

  /**
   * Setup listener for theme changes (watches for class/attribute changes on html element)
   */
  private setupThemeChangeListener(): void {
    if (!this.isBrowser) return;

    // Watch for changes on document element (class, data-theme, etc.)
    this.mutationObserver = new MutationObserver(() => {
      this.reloadColors();
    });

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-color-schema'],
    });

    // Also watch for prefers-color-scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => this.reloadColors();
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.mutationObserver?.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    });
  }

  /**
   * Get color version signal (use in computed to react to theme changes)
   */
  getColorVersion() {
    return this.colorVersion;
  }

  /**
   * Get hex value for a specific chart color
   */
  getColorHex(color: ChartColor): string {
    // Access colorVersion to create dependency for reactivity
    this.colorVersion();
    return this.colorHexCache[color] || this.fallbackColors[color];
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
   * Reload colors from CSS variables (call when theme changes)
   */
  reloadColors(): void {
    this.loadColorsFromCssVariables();
    this.colorVersion.update(v => v + 1);
  }
}

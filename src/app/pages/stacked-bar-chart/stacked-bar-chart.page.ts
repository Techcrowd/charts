import { Component, inject } from '@angular/core';
import {
  CoStackedBarChartComponent,
  StackedBarChartData,
  ChartColor,
} from '../../components/co-stacked-bar-chart/co-stacked-bar-chart.component';
import { ChartColorService } from '../../services/chart-color.service';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-stacked-bar-chart-page',
  standalone: true,
  imports: [CoStackedBarChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './stacked-bar-chart.page.html',
})
export class StackedBarChartPage {
  private chartColorService = inject(ChartColorService);

  // Základní data - 3 sekce
  portfolioData: StackedBarChartData = {
    sections: [
      { name: 'Akcie', value: 1215211 },
      { name: 'Fondy', value: 845000 },
      { name: 'Dluhopisy', value: 620500 },
    ],
  };

  // 2 sekce
  twoSectionsData: StackedBarChartData = {
    sections: [
      { name: 'Příjmy', value: 78500 },
      { name: 'Výdaje', value: 42300 },
    ],
  };

  // 5 sekcí
  fiveSectionsData: StackedBarChartData = {
    sections: [
      { name: 'Akcie', value: 450 },
      { name: 'Fondy', value: 320 },
      { name: 'Dluhopisy', value: 280 },
      { name: 'Hotovost', value: 150 },
      { name: 'Komodity', value: 95 },
    ],
  };

  // Extrémně malý podíl + nulová hodnota
  minShareData: StackedBarChartData = {
    sections: [
      { name: 'Akcie', value: 985000 },
      { name: 'Fondy', value: 428000 },
      { name: 'Krypto', value: 3200 },
      { name: 'Komodity', value: 0 },
    ],
  };

  // Jedna sekce
  singleSectionData: StackedBarChartData = {
    sections: [{ name: 'Akcie', value: 1215211 }],
  };

  // Dostupné barvy pro zobrazení
  availableColors = this.chartColorService.availableColors;

  // Interaktivní state
  lastAction = 'Žádná';
  lastClickEvent: string | null = null;
  lastHoverEvent: string | null = null;

  // Code examples
  code = {
    basic: `<co-stacked-bar-chart [data]="chartData" [showLegend]="true" />`,
    basicTs: `chartData: StackedBarChartData = {
  sections: [
    { name: 'Akcie', value: 1215211 },
    { name: 'Fondy', value: 845000 },
    { name: 'Dluhopisy', value: 620500 },
  ],
};`,
    valuesOn: `<co-stacked-bar-chart [data]="data" [showSectionValues]="true" />`,
    valuesOff: `<co-stacked-bar-chart [data]="data" [showSectionValues]="false" />`,
    valuesPercent: `<co-stacked-bar-chart [data]="data" [valueFormat]="'percent'" />`,
    valuesCompact: `<co-stacked-bar-chart [data]="data" [compactValues]="true" />`,
    valuesUnit: `<co-stacked-bar-chart [data]="data" [valueUnit]="'Kč'" [compactValues]="true" />`,
    tooltipOn: `<co-stacked-bar-chart [data]="data" [showTooltip]="true" />`,
    minShare: `<co-stacked-bar-chart [data]="data" [minSectionPercent]="3" />`,
    interaction: `<co-stacked-bar-chart
  [data]="data"
  (sectionClick)="onSectionClick($event)"
  (sectionHover)="onSectionHover($event)"
/>`,
    interactionTs: `onSectionClick(event) {
  console.log('Klik:', event.name, event.value, event.percent);
}`,
    loading: `<co-stacked-bar-chart
  [data]="data"
  [loading]="true"
  [skeletonSectionCount]="3"
  [showLegend]="true"
/>`,
    legendOn: `<co-stacked-bar-chart [data]="data" [showLegend]="true" />`,
    legendOff: `<co-stacked-bar-chart [data]="data" [showLegend]="false" />`,
    colors: `<co-stacked-bar-chart
  [data]="data"
  [colors]="['chart-evaluation', 'chart-neon', 'chart-cool']"
/>`,
  };

  getColorHex(color: ChartColor): string {
    return this.chartColorService.getColorHex(color);
  }

  onSectionClick(event: { sectionIndex: number; name: string; value: number; percent: number }): void {
    this.lastAction = `Klik: ${event.name} (${event.value.toLocaleString('cs-CZ')} | ${event.percent.toFixed(1)} %)`;
    this.lastClickEvent = JSON.stringify({ ...event, percent: +event.percent.toFixed(2) }, null, 2);
  }

  onSectionHover(
    event: { sectionIndex: number; name: string; value: number; percent: number } | null
  ): void {
    if (event) {
      this.lastAction = `Hover: ${event.name} (${event.percent.toFixed(1)} %)`;
      this.lastHoverEvent = JSON.stringify({ ...event, percent: +event.percent.toFixed(2) }, null, 2);
    } else {
      this.lastHoverEvent = 'null (mouse leave)';
    }
  }
}

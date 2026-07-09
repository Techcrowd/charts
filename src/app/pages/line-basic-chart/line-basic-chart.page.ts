import { Component, inject } from '@angular/core';
import {
  CoLineBasicChartComponent,
  LineBasicChartData,
  ChartColor,
} from '../../components/co-line-basic-chart/co-line-basic-chart.component';
import { ChartColorService } from '../../services/chart-color.service';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-line-basic-chart-page',
  standalone: true,
  imports: [CoLineBasicChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './line-basic-chart.page.html',
})
export class LineBasicChartPage {
  private chartColorService = inject(ChartColorService);

  // Scénáře vývoje investice (roky) — stejná výchozí hodnota
  scenariosData: LineBasicChartData = {
    labels: ['1990', '1998', '2006', '2014', '2022'],
    series: [
      { name: 'Příznivý', data: [141000, 205000, 298000, 415000, 546000] },
      { name: 'Neutrální', data: [141000, 168000, 197000, 215000, 234000] },
      { name: 'Nepříznivý', data: [141000, 152000, 160000, 168000, 176000] },
    ],
  };

  // Jedna křivka (měsíce)
  singleData: LineBasicChartData = {
    labels: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    series: [
      { name: 'Zůstatek', data: [52000, 54500, 51800, 58900, 61200, 60100, 64800, 67300, 65900, 71200, 74600, 78100] },
    ],
  };

  // Hodiny
  hoursData: LineBasicChartData = {
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    series: [
      { name: 'Kurz', data: [24.35, 24.42, 24.31, 24.55, 24.61, 24.48] },
      { name: 'Průměr', data: [24.4, 24.41, 24.43, 24.45, 24.48, 24.5] },
    ],
  };

  // Dny
  daysData: LineBasicChartData = {
    labels: ['po', 'út', 'st', 'čt', 'pá', 'so', 'ne'],
    series: [
      { name: 'Příjmy', data: [12400, 9800, 15200, 11600, 18900, 22400, 8700] },
      { name: 'Výdaje', data: [8200, 11400, 9600, 13100, 10800, 15600, 12300] },
    ],
  };

  availableColors = this.chartColorService.availableColors;

  lastHoverEvent: string | null = null;

  code = {
    basic: `<co-line-basic-chart [data]="chartData" [showLegend]="true" />`,
    basicTs: `chartData: LineBasicChartData = {
  labels: ['1990', '1998', '2006', '2014', '2022'],
  series: [
    { name: 'Příznivý', data: [141000, 205000, 298000, 415000, 546000] },
    { name: 'Neutrální', data: [141000, 168000, 197000, 215000, 234000] },
    { name: 'Nepříznivý', data: [141000, 152000, 160000, 168000, 176000] },
  ],
};`,
    startValues: `<co-line-basic-chart [data]="data" [showStartValues]="true" [compactValues]="true" />`,
    endValues: `<co-line-basic-chart [data]="data" [showEndValues]="true" [compactValues]="true" />`,
    bothValues: `<co-line-basic-chart
  [data]="data"
  [showStartValues]="true"
  [showEndValues]="true"
  [valueUnit]="'Kč'"
  [compactValues]="true"
/>`,
    tooltip: `<co-line-basic-chart [data]="data" [showTooltip]="true" [valueUnit]="'Kč'" />`,
    hover: `<co-line-basic-chart [data]="data" (pointHover)="onPointHover($event)" />`,
    loading: `<co-line-basic-chart
  [data]="data"
  [loading]="true"
  [skeletonSeriesCount]="3"
  [showLegend]="true"
/>`,
    colors: `<co-line-basic-chart
  [data]="data"
  [colors]="['chart-evaluation', 'chart-neon', 'chart-cool']"
/>`,
    height: `<co-line-basic-chart [data]="data" [height]="280" />`,
  };

  getColorHex(color: ChartColor): string {
    return this.chartColorService.getColorHex(color);
  }

  onPointHover(
    event: { seriesIndex: number; dataPointIndex: number; seriesName: string; label: string; value: number } | null
  ): void {
    this.lastHoverEvent = event
      ? JSON.stringify(event, null, 2)
      : 'null (mouse leave)';
  }
}

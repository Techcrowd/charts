import { Component, inject } from '@angular/core';
import { CoBarChartComponent, BarChartData, ChartColor } from '../../components/co-bar-chart/co-bar-chart.component';
import { ChartColorService } from '../../services/chart-color.service';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-bar-chart-page',
  standalone: true,
  imports: [CoBarChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './bar-chart.page.html',
})
export class BarChartPage {
  private chartColorService = inject(ChartColorService);

  // Data pro grafy - země
  countryData: BarChartData = {
    categories: ['Čína', 'Belgie', 'Francie', 'Tchaj-wan', 'Rakousko'],
    series: [
      { name: 'Produkty', data: [248, 185, 115, 65, 48] },
    ],
  };

  // Data pro více kategorií
  manyRowsData: BarChartData = {
    categories: ['Německo', 'Francie', 'Itálie', 'Španělsko', 'Polsko', 'Nizozemsko', 'Belgie', 'Česko'],
    series: [
      { name: 'Export', data: [1250, 980, 870, 650, 520, 480, 390, 280] },
    ],
  };

  // Dostupné barvy pro zobrazení
  availableColors = this.chartColorService.availableColors;

  // Interaktivní state
  lastAction = 'Žádná';

  // Code examples
  code = {
    basic: `<co-bar-chart [data]="chartData" />`,
    basicTs: `chartData: BarChartData = {
  categories: ['Čína', 'Belgie', 'Francie', 'Tchaj-wan', 'Rakousko'],
  series: [
    { name: 'Produkty', data: [248, 185, 115, 65, 48] },
  ],
};`,
    height250: `<co-bar-chart [data]="data" [height]="250" />`,
    height400: `<co-bar-chart [data]="data" [height]="400" />`,
    labelsDefault: `<co-bar-chart [data]="data" />`,
    labelsOff: `<co-bar-chart [data]="data" [showDataLabels]="false" />`,
    gridOff: `<co-bar-chart [data]="data" [showGrid]="false" />`,
    interaction: `<co-bar-chart
  [data]="data"
  (barClick)="onBarClick($event)"
  (barHover)="onBarHover($event)"
/>`,
    interactionTs: `onBarClick(event) {
  console.log('Klik:', event.seriesName, event.category, event.value);
}

onBarHover(event) {
  if (event) {
    console.log('Hover:', event.seriesName, event.category);
  }
}`,
    loading5: `<co-bar-chart
  [data]="data"
  [loading]="true"
  [skeletonRowCount]="5"
/>`,
    legendOn: `<co-bar-chart [data]="data" [showLegend]="true" />`,
    legendOff: `<co-bar-chart [data]="data" [showLegend]="false" />`,
    tooltipOn: `<co-bar-chart [data]="data" [showTooltip]="true" />`,
    colorBonds: `<co-bar-chart [data]="data" />`,
    colorIn: `<co-bar-chart [data]="data" [colors]="['chart-in']" />`,
    colorStocks: `<co-bar-chart [data]="data" [colors]="['chart-stocks']" />`,
  };

  getColorHex(color: ChartColor): string {
    return this.chartColorService.getColorHex(color);
  }

  onBarClick(event: any): void {
    console.log('[barClick]', event);
    if (event.dataPointIndex >= 0) {
      this.lastAction = `Klik: ${event.seriesName} - ${event.category} (${event.value})`;
    } else {
      this.lastAction = `Klik na legendu: ${event.seriesName}`;
    }
  }

  onBarHover(event: {
    seriesIndex: number;
    dataPointIndex: number;
    value: number;
    category: string;
    seriesName: string;
  } | null): void {
    if (event) {
      this.lastAction = `Hover: ${event.seriesName} - ${event.category}`;
    }
  }
}

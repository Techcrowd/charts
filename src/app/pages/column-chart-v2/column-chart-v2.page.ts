import { Component } from '@angular/core';
import { CoColumnChartV2Component, ColumnChartV2Data, ChartColor } from '../../components/co-column-chart-v2/co-column-chart-v2.component';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-column-chart-v2-page',
  standalone: true,
  imports: [CoColumnChartV2Component, MarkdownComponent, LanguagePipe],
  templateUrl: './column-chart-v2.page.html',
})
export class ColumnChartV2Page {
  // Data pro grafy - měsíční měny
  currencyData: ColumnChartV2Data = {
    categories: ['Listopad 2025', 'Prosinec 2025', 'Leden 2026', 'Únor 2026', 'Březen 2026', 'Duben 2026'],
    series: [
      { name: 'CZK', data: [12, 9, 15.3, 4, 12, 1.2] },
      { name: 'EUR', data: [17, 13, 18.7, 11, 17, 5] },
      { name: 'USD', data: [8, 4, 9, 8, 15, 9] },
    ],
  };

  // Jednoduchá data
  simpleData: ColumnChartV2Data = {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      { name: 'Prodeje', data: [44, 55, 57, 56] },
    ],
  };

  // Data se dvěma sériemi
  twoSeriesData: ColumnChartV2Data = {
    categories: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen'],
    series: [
      { name: 'Příjmy', data: [76, 85, 101, 98, 87] },
      { name: 'Výdaje', data: [35, 41, 36, 26, 45] },
    ],
  };

  // Vlastní barvy pro ukázku
  customColors: ChartColor[] = ['chart-in', 'chart-out', 'chart-stocks'];

  // Vlastní hodnoty do legendy
  legendValues = [68.5, 81.7, 53];

  // Interaktivní state
  lastAction = 'Žádná';

  // Code examples
  code = {
    basic: `<co-column-chart-v2 [data]="chartData" />`,
    multiSeries: `<co-column-chart-v2 [data]="currencyData" />`,
    tooltipOn: `<co-column-chart-v2 [data]="data" [showTooltip]="true" valueUnit="mil. Kč" />`,
    yAxisOff: `<co-column-chart-v2 [data]="data" [showYAxisLabels]="false" />`,
    legendValues: `<co-column-chart-v2
  [data]="data"
  [showLegend]="true"
  [showLegendValues]="true"
  [legendValues]="[68.5, 81.7, 53]"
/>`,
    legendStatic: `<co-column-chart-v2
  [data]="data"
  [showLegend]="true"
  [legendInteractive]="false"
/>`,
    interaction: `<co-column-chart-v2
  [data]="data"
  (columnClick)="onColumnClick($event)"
  (columnHover)="onColumnHover($event)"
/>`,
    loading: `<co-column-chart-v2 [data]="data" [loading]="true" />`,
  };

  onColumnClick(event: any): void {
    console.log('[columnClick]', event);
    if (event.dataPointIndex >= 0) {
      this.lastAction = `Klik: ${event.seriesName} - ${event.category} (${event.value})`;
    } else {
      this.lastAction = `Klik na legendu: ${event.seriesName}`;
    }
  }

  onColumnHover(event: { seriesName: string; category: string } | null): void {
    if (event) {
      this.lastAction = `Hover: ${event.seriesName} - ${event.category}`;
    }
  }
}

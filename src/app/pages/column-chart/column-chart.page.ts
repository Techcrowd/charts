import { Component, inject } from '@angular/core';
import { CoColumnChartComponent, ColumnChartData, ChartColor } from '../../components/co-column-chart/co-column-chart.component';
import { ChartColorService } from '../../services/chart-color.service';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-column-chart-page',
  standalone: true,
  imports: [CoColumnChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './column-chart.page.html',
})
export class ColumnChartPage {
  private chartColorService = inject(ChartColorService);

  // Data pro grafy - měsíční měny
  currencyData: ColumnChartData = {
    categories: ['Listopad 2025', 'Prosinec 2025', 'Leden 2026', 'Únor 2026', 'Březen 2026', 'Duben 2026'],
    series: [
      { name: 'CZK', data: [12, 9, 15.3, 4, 12, 1.2] },
      { name: 'EUR', data: [17, 13, 18.7, 11, 17, 5] },
      { name: 'USD', data: [8, 4, 9, 8, 15, 9] },
    ],
  };

  // Jednoduchá data
  simpleData: ColumnChartData = {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      { name: 'Prodeje', data: [44, 55, 57, 56] },
    ],
  };

  // Data se dvěma sériemi
  twoSeriesData: ColumnChartData = {
    categories: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen'],
    series: [
      { name: 'Příjmy', data: [76, 85, 101, 98, 87] },
      { name: 'Výdaje', data: [35, 41, 36, 26, 45] },
    ],
  };

  // Data pro ukázku velkých hodnot
  bigValuesData: ColumnChartData = {
    categories: ['2021', '2022', '2023', '2024'],
    series: [
      { name: 'Obrat', data: [1250000, 1450000, 1680000, 1920000] },
    ],
  };

  // Vlastní barvy pro ukázku
  customColors: ChartColor[] = ['chart-in', 'chart-out', 'chart-stocks'];

  // Dostupné barvy pro zobrazení
  availableColors = this.chartColorService.availableColors;

  // Interaktivní state
  lastAction = 'Žádná';

  // Code examples
  code = {
    basic: `<co-column-chart [data]="chartData" />`,
    basicTs: `chartData: ColumnChartData = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Prodeje', data: [44, 55, 57, 56] },
  ],
};`,
    multiSeries: `<co-column-chart [data]="currencyData" />`,
    multiSeriesTs: `currencyData: ColumnChartData = {
  categories: ['Listopad', 'Prosinec', 'Leden', 'Únor', 'Březen', 'Duben'],
  series: [
    { name: 'CZK', data: [12, 9, 15.3, 4, 12, 1.2] },
    { name: 'EUR', data: [17, 13, 18.7, 11, 17, 5] },
    { name: 'USD', data: [8, 4, 9, 8, 15, 9] },
  ],
};`,
    twoSeries: `chartData: ColumnChartData = {
  categories: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen'],
  series: [
    { name: 'Příjmy', data: [76, 85, 101, 98, 87] },
    { name: 'Výdaje', data: [35, 41, 36, 26, 45] },
  ],
};`,
    customColors: `<co-column-chart
  [data]="data"
  [colors]="['chart-in', 'chart-out', 'chart-stocks']"
/>`,
    height200: `<co-column-chart [data]="data" [height]="200" />`,
    height400: `<co-column-chart [data]="data" [height]="400" />`,
    labelsDefault: `<co-column-chart [data]="data" />`,
    labelsOff: `<co-column-chart [data]="data" [showDataLabels]="false" />`,
    tooltipOff: `<co-column-chart [data]="data" [showTooltip]="false" />`,
    yAxisTitle: `<co-column-chart
  [data]="data"
  yAxisTitle="Miliony CZK"
/>`,
    valueUnit: `<co-column-chart
  [data]="data"
  valueUnit="Kč"
/>`,
    legendOn: `<co-column-chart [data]="data" [showLegend]="true" />`,
    legendOff: `<co-column-chart [data]="data" [showLegend]="false" />`,
    tooltipOn: `<co-column-chart [data]="data" [showTooltip]="true" />`,
    interaction: `<co-column-chart
  [data]="data"
  (columnClick)="onColumnClick($event)"
  (columnHover)="onColumnHover($event)"
/>`,
    interactionTs: `onColumnClick(event) {
  console.log('Klik:', event.seriesName, event.category, event.value);
}

onColumnHover(event) {
  if (event) {
    console.log('Hover:', event.seriesName, event.category);
  }
}`,
    loading3: `<co-column-chart
  [data]="data"
  [loading]="true"
  [skeletonColumnCount]="6"
  [skeletonSeriesCount]="3"
/>`,
    loading1: `<co-column-chart
  [data]="data"
  [loading]="true"
  [skeletonColumnCount]="4"
  [skeletonSeriesCount]="1"
/>`,
  };

  getColorHex(color: ChartColor): string {
    return this.chartColorService.getColorHex(color);
  }

  onColumnClick(event: {
    seriesIndex: number;
    dataPointIndex: number;
    value: number;
    category: string;
    seriesName: string;
  }): void {
    if (event.dataPointIndex >= 0) {
      this.lastAction = `Klik: ${event.seriesName} - ${event.category} (${event.value})`;
    } else {
      this.lastAction = `Klik na legendu: ${event.seriesName}`;
    }
  }

  onColumnHover(event: {
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

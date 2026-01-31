import { Component, inject } from '@angular/core';
import { CoDonutChartComponent, DonutChartDataItem, ChartColor } from '../../components/co-donut-chart/co-donut-chart.component';
import { ChartColorService } from '../../services/chart-color.service';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-donut-chart-page',
  standalone: true,
  imports: [CoDonutChartComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './donut-chart.page.html',
})
export class DonutChartPage {
  private chartColorService = inject(ChartColorService);

  // Data pro grafy
  fruitData: DonutChartDataItem[] = [
    { label: 'Jablka', value: 450 },
    { label: 'Jahody', value: 300 },
    { label: 'Hrušky', value: 180 },
    { label: 'Pomeranče', value: 120 },
  ];

  twoSeriesData: DonutChartDataItem[] = [
    { label: 'Aktivní', value: 750 },
    { label: 'Neaktivní', value: 250 },
  ];

  threeSeriesData: DonutChartDataItem[] = [
    { label: 'Schváleno', value: 60 },
    { label: 'Čeká', value: 25 },
    { label: 'Zamítnuto', value: 15 },
  ];

  browserData: DonutChartDataItem[] = [
    { label: 'Chrome', value: 65 },
    { label: 'Safari', value: 19 },
    { label: 'Firefox', value: 8 },
    { label: 'Edge', value: 4 },
    { label: 'Opera', value: 2 },
    { label: 'Ostatní', value: 2 },
  ];

  // Vlastní barvy pro ukázku
  customColors: ChartColor[] = ['chart-in', 'chart-stocks', 'chart-bonds', 'chart-neon'];

  // Dostupné barvy pro zobrazení
  availableColors = this.chartColorService.availableColors;

  // Center text
  centerTextLong = 'Toto je velmi dlouhý text který se nevejde na tři řádky a proto bude oříznut';

  // Interaktivní state
  lastAction = 'Žádná';
  selectedCenterText = 'Vyber položku';

  // Code examples
  code = {
    basic: `<co-donut-chart [data]="chartData" />`,
    basicTs: `chartData: DonutChartDataItem[] = [
  { label: 'Jablka', value: 450 },
  { label: 'Jahody', value: 300 },
  { label: 'Hrušky', value: 180 },
  { label: 'Pomeranče', value: 120 },
];`,
    defaultPalette: `<co-donut-chart [data]="data" />`,
    customColors: `<co-donut-chart
  [data]="data"
  [colors]="['chart-in', 'chart-stocks', 'chart-bonds', 'chart-neon']"
/>`,
    sizeSm: `<co-donut-chart [data]="data" size="sm" />`,
    sizeMd: `<co-donut-chart [data]="data" size="md" />`,
    sizeLg: `<co-donut-chart [data]="data" size="lg" />`,
    height150: `<co-donut-chart [data]="data" [height]="150" />`,
    height350: `<co-donut-chart [data]="data" [height]="350" />`,
    centerShort: `<co-donut-chart [data]="data" centerText="Ovoce" />`,
    centerMedium: `<co-donut-chart [data]="data" centerText="Celkový počet kusů" />`,
    centerLong: `<co-donut-chart [data]="data" [centerText]="longText" />`,
    twoSeries: `data = [
  { label: 'Aktivní', value: 750 },
  { label: 'Neaktivní', value: 250 },
];`,
    threeSeries: `data = [
  { label: 'Schváleno', value: 60 },
  { label: 'Čeká', value: 25 },
  { label: 'Zamítnuto', value: 15 },
];`,
    sixSeries: `data = [
  { label: 'Chrome', value: 65 },
  { label: 'Safari', value: 19 },
  { label: 'Firefox', value: 8 },
  { label: 'Edge', value: 4 },
  { label: 'Opera', value: 2 },
  { label: 'Ostatní', value: 2 },
];`,
    labelsDefault: `<co-donut-chart [data]="data" />`,
    labelsOff: `<co-donut-chart [data]="data" [showDataLabels]="false" />`,
    tooltipOn: `<co-donut-chart [data]="data" [showTooltip]="true" />`,
    formatPercent: `<co-donut-chart
  [data]="data"
  valueFormat="percent"
  [showLegendValues]="true"
/>`,
    formatAbsolute: `<co-donut-chart
  [data]="data"
  valueFormat="absolute"
  [showLegendValues]="true"
/>`,
    legendDefault: `<co-donut-chart [data]="data" />`,
    legendValues: `<co-donut-chart [data]="data" [showLegendValues]="true" />`,
    legendOff: `<co-donut-chart [data]="data" [showLegend]="false" />`,
    interaction: `<co-donut-chart
  [data]="data"
  [centerText]="selectedLabel"
  (segmentClick)="onSegmentClick($event)"
  (segmentHover)="onSegmentHover($event)"
/>`,
    interactionTs: `selectedLabel = 'Vyber položku';

onSegmentClick(event: { item: DonutChartDataItem; index: number }) {
  this.selectedLabel = event.item.label;
}`,
    loading4: `<co-donut-chart
  [data]="data"
  [loading]="true"
  [skeletonLegendCount]="4"
/>`,
    loading2: `<co-donut-chart
  [data]="data"
  [loading]="true"
  [skeletonLegendCount]="2"
/>`,
    loading6: `<co-donut-chart
  [data]="data"
  [loading]="true"
  [skeletonLegendCount]="6"
/>`,
  };

  getColorHex(color: ChartColor): string {
    return this.chartColorService.getColorHex(color);
  }

  onSegmentClick(event: { item: DonutChartDataItem; index: number }): void {
    this.lastAction = `Klik: ${event.item.label} (${event.item.value})`;
    this.selectedCenterText = event.item.label;
  }

  onSegmentHover(event: { item: DonutChartDataItem; index: number } | null): void {
    if (event) {
      this.lastAction = `Hover: ${event.item.label}`;
    }
  }
}

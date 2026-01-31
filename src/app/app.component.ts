import { Component, inject } from '@angular/core';
import { CoDonutChartComponent, DonutChartDataItem, ChartColor } from './components/co-donut-chart/co-donut-chart.component';
import { ChartColorService } from './services/chart-color.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoDonutChartComponent, MarkdownComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
    basic: '```html\n<co-donut-chart [data]="chartData" />\n```',
    basicTs: '```typescript\nchartData: DonutChartDataItem[] = [\n  { label: \'Jablka\', value: 450 },\n  { label: \'Jahody\', value: 300 },\n  { label: \'Hrušky\', value: 180 },\n  { label: \'Pomeranče\', value: 120 },\n];\n```',
    defaultPalette: '```html\n<co-donut-chart [data]="data" />\n```',
    customColors: '```html\n<co-donut-chart\n  [data]="data"\n  [colors]="[\'chart-in\', \'chart-stocks\', \'chart-bonds\', \'chart-neon\']"\n/>\n```',
    sizeSm: '```html\n<co-donut-chart [data]="data" size="sm" />\n```',
    sizeMd: '```html\n<co-donut-chart [data]="data" size="md" />\n```',
    sizeLg: '```html\n<co-donut-chart [data]="data" size="lg" />\n```',
    height150: '```html\n<co-donut-chart [data]="data" [height]="150" />\n```',
    height350: '```html\n<co-donut-chart [data]="data" [height]="350" />\n```',
    centerShort: '```html\n<co-donut-chart [data]="data" centerText="Ovoce" />\n```',
    centerMedium: '```html\n<co-donut-chart [data]="data" centerText="Celkový počet kusů" />\n```',
    centerLong: '```html\n<co-donut-chart [data]="data" [centerText]="longText" />\n```',
    twoSeries: '```typescript\ndata = [\n  { label: \'Aktivní\', value: 750 },\n  { label: \'Neaktivní\', value: 250 },\n];\n```',
    threeSeries: '```typescript\ndata = [\n  { label: \'Schváleno\', value: 60 },\n  { label: \'Čeká\', value: 25 },\n  { label: \'Zamítnuto\', value: 15 },\n];\n```',
    sixSeries: '```typescript\ndata = [\n  { label: \'Chrome\', value: 65 },\n  { label: \'Safari\', value: 19 },\n  { label: \'Firefox\', value: 8 },\n  { label: \'Edge\', value: 4 },\n  { label: \'Opera\', value: 2 },\n  { label: \'Ostatní\', value: 2 },\n];\n```',
    labelsDefault: '```html\n<co-donut-chart [data]="data" />\n```',
    labelsOff: '```html\n<co-donut-chart [data]="data" [showDataLabels]="false" />\n```',
    tooltipOn: '```html\n<co-donut-chart [data]="data" [showTooltip]="true" />\n```',
    formatPercent: '```html\n<co-donut-chart\n  [data]="data"\n  valueFormat="percent"\n  [showLegendValues]="true"\n/>\n```',
    formatAbsolute: '```html\n<co-donut-chart\n  [data]="data"\n  valueFormat="absolute"\n  [showLegendValues]="true"\n/>\n```',
    legendDefault: '```html\n<co-donut-chart [data]="data" />\n```',
    legendValues: '```html\n<co-donut-chart [data]="data" [showLegendValues]="true" />\n```',
    legendOff: '```html\n<co-donut-chart [data]="data" [showLegend]="false" />\n```',
    interaction: '```html\n<co-donut-chart\n  [data]="data"\n  [centerText]="selectedLabel"\n  (segmentClick)="onSegmentClick($event)"\n  (segmentHover)="onSegmentHover($event)"\n/>\n```',
    interactionTs: '```typescript\nselectedLabel = \'Vyber položku\';\n\nonSegmentClick(event: { item: DonutChartDataItem; index: number }) {\n  this.selectedLabel = event.item.label;\n}\n```',
    loading4: '```html\n<co-donut-chart\n  [data]="data"\n  [loading]="true"\n  [skeletonLegendCount]="4"\n/>\n```',
    loading2: '```html\n<co-donut-chart\n  [data]="data"\n  [loading]="true"\n  [skeletonLegendCount]="2"\n/>\n```',
    loading6: '```html\n<co-donut-chart\n  [data]="data"\n  [loading]="true"\n  [skeletonLegendCount]="6"\n/>\n```',
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

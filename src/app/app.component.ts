import { Component, inject } from '@angular/core';
import { CoDonutChartComponent, DonutChartDataItem } from './components/co-donut-chart/co-donut-chart.component';
import { ChartColorService, ChartColor } from './services/chart-color.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoDonutChartComponent],
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

  // Dostupné barvy pro zobrazení
  availableColors = this.chartColorService.availableColors;

  // Center text
  centerTextLong = 'Toto je velmi dlouhý text který se nevejde na tři řádky a proto bude oříznut';

  // Interaktivní state
  lastAction = 'Žádná';
  selectedCenterText = 'Vyber položku';

  // Code examples
  fruitDataCode = `data = [
  { label: 'Jablka', value: 450 },
  { label: 'Jahody', value: 300 },
  { label: 'Hrušky', value: 180 },
  { label: 'Pomeranče', value: 120 },
];`;

  twoSeriesDataCode = `data = [
  { label: 'Aktivní', value: 750 },
  { label: 'Neaktivní', value: 250 },
];`;

  threeSeriesDataCode = `data = [
  { label: 'Schváleno', value: 60 },
  { label: 'Čeká', value: 25 },
  { label: 'Zamítnuto', value: 15 },
];`;

  browserDataCode = `data = [
  { label: 'Chrome', value: 65 },
  { label: 'Safari', value: 19 },
  { label: 'Firefox', value: 8 },
  { label: 'Edge', value: 4 },
  { label: 'Opera', value: 2 },
  { label: 'Ostatní', value: 2 },
];`;

  interactionCode = `selectedLabel = 'Vyber položku';

onSegmentClick(event) {
  this.selectedLabel = event.item.label;
}

onSegmentHover(event) {
  if (event) {
    console.log('Hover:', event.item);
  }
}`;

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

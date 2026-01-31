import { Component } from '@angular/core';
import { DonutChartDataItem } from './components/co-donut-chart/co-donut-chart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
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

  // Center text examples
  centerTextShort = 'Ovoce';
  centerTextMedium = 'Celkový počet kusů ovoce';
  centerTextLong = 'Toto je velmi dlouhý text který se nevejde na tři řádky a proto bude oříznut s elipsis na konci';

  // Interactive state
  lastAction = 'Žádná';
  selectedCenterText = 'Vyber položku';

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

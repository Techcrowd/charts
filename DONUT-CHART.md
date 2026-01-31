# CO Donut Chart

Angular komponenta pro zobrazení donut grafu pomocí ApexCharts.

## Instalace

```bash
npm install ng-apexcharts apexcharts
```

## Import

```typescript
import { CoDonutChartComponent, DonutChartDataItem, ChartColor } from './components/co-donut-chart/co-donut-chart.component';

@Component({
  imports: [CoDonutChartComponent],
  // ...
})
```

## Příklady použití

### Základní použití

```html
<co-donut-chart [data]="data" />
```

```typescript
data: DonutChartDataItem[] = [
  { label: 'Jablka', value: 450 },
  { label: 'Jahody', value: 300 },
  { label: 'Hrušky', value: 180 },
  { label: 'Pomeranče', value: 120 },
];
```

### Vlastní barvy

```html
<co-donut-chart
  [data]="data"
  [colors]="['chart-in', 'chart-stocks', 'chart-bonds', 'chart-neon']"
/>
```

Dostupné barvy (ChartColor):
- `chart-in` - zelená
- `chart-out` - tmavá
- `chart-funds` - tyrkysová
- `chart-cool` - cyan
- `chart-evaluation` - fialová
- `chart-stocks` - růžová
- `chart-bonds` - modro-šedá
- `chart-neon` - magenta
- `chart-rusty-red` - korálová
- `chart-orangish` - hnědá

### Velikostní varianty

```html
<!-- Small -->
<co-donut-chart [data]="data" size="sm" />

<!-- Medium (výchozí) -->
<co-donut-chart [data]="data" size="md" />

<!-- Large -->
<co-donut-chart [data]="data" size="lg" />

<!-- Vlastní výška -->
<co-donut-chart [data]="data" [height]="350" />
```

### Text uprostřed

```html
<co-donut-chart
  [data]="data"
  centerText="Celkem"
/>
```

### Data labels a tooltip

```html
<!-- S hodnotami na výsečích (výchozí) -->
<co-donut-chart [data]="data" />

<!-- Bez hodnot -->
<co-donut-chart [data]="data" [showDataLabels]="false" />

<!-- S tooltipem -->
<co-donut-chart [data]="data" [showTooltip]="true" />
```

### Formát hodnot

```html
<!-- Procenta (výchozí) -->
<co-donut-chart [data]="data" valueFormat="percent" />

<!-- Absolutní hodnoty -->
<co-donut-chart [data]="data" valueFormat="absolute" />
```

### Legenda

```html
<!-- S legendou (výchozí) -->
<co-donut-chart [data]="data" [showLegend]="true" />

<!-- S hodnotami v legendě -->
<co-donut-chart [data]="data" [showLegendValues]="true" />

<!-- Bez legendy -->
<co-donut-chart [data]="data" [showLegend]="false" />
```

### Seskupení malých hodnot

```html
<!-- Hodnoty pod 50 se sloučí do "Ostatní" -->
<co-donut-chart [data]="data" [minValue]="50" />
```

### Interakce

```html
<co-donut-chart
  [data]="data"
  [centerText]="selectedLabel"
  (segmentClick)="onSegmentClick($event)"
  (segmentHover)="onSegmentHover($event)"
/>
```

```typescript
selectedLabel = 'Vyber položku';

onSegmentClick(event: { item: DonutChartDataItem; index: number }): void {
  this.selectedLabel = event.item.label;
  console.log('Klik:', event.item);
}

onSegmentHover(event: { item: DonutChartDataItem; index: number } | null): void {
  if (event) {
    console.log('Hover:', event.item);
  }
}
```

### Loading stav

```html
<!-- Loading s 4 skeleton položkami legendy -->
<co-donut-chart [data]="data" [loading]="true" [skeletonLegendCount]="4" />

<!-- Loading s 2 skeleton položkami -->
<co-donut-chart [data]="data" [loading]="true" [skeletonLegendCount]="2" />
```

### Kompletní příklad

```html
<co-donut-chart
  [data]="salesData"
  size="lg"
  centerText="Prodeje Q4"
  [colors]="['chart-in', 'chart-stocks', 'chart-bonds']"
  [showTooltip]="true"
  [showLegend]="true"
  [showLegendValues]="true"
  valueFormat="absolute"
  (segmentClick)="onSaleClick($event)"
/>
```

## API Reference

### Inputs

| Input | Typ | Default | Popis |
|-------|-----|---------|-------|
| `data` | `DonutChartDataItem[]` | `[]` | Data pro graf |
| `colors` | `ChartColor[]` | výchozí paleta | Vlastní barvy z palety |
| `size` | `'sm' \| 'md' \| 'lg' \| 'auto'` | `'md'` | Velikostní varianta |
| `height` | `number` | - | Vlastní výška v px |
| `centerText` | `string` | - | Text uprostřed grafu |
| `showDataLabels` | `boolean` | `true` | Zobrazit hodnoty na výsečích |
| `showTooltip` | `boolean` | `false` | Zobrazit tooltip |
| `showLegend` | `boolean` | `true` | Zobrazit legendu |
| `showLegendValues` | `boolean` | `false` | Zobrazit hodnoty v legendě |
| `valueFormat` | `'percent' \| 'absolute'` | `'percent'` | Formát hodnot |
| `minValue` | `number` | - | Min. hodnota pro seskupení |
| `loading` | `boolean` | `false` | Loading stav |
| `skeletonLegendCount` | `number` | `4` | Počet skeleton položek |

### Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `segmentClick` | `{ item: DonutChartDataItem, index: number }` | Kliknutí na segment |
| `segmentHover` | `{ item: DonutChartDataItem, index: number } \| null` | Hover nad segmentem |

### Typy

```typescript
interface DonutChartDataItem {
  label: string;
  value: number;
}

type ChartColor =
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
```

## Služby

### ChartColorService

Služba pro práci s barvami grafů.

```typescript
import { ChartColorService, ChartColor } from './services/chart-color.service';

@Component({...})
export class MyComponent {
  private colorService = inject(ChartColorService);

  // Získat hex hodnotu barvy
  hex = this.colorService.getColorHex('chart-in'); // '#267c29'

  // Získat pole hex hodnot
  hexColors = this.colorService.getColorsHex(['chart-in', 'chart-out']);

  // Získat N barev ve výchozím pořadí
  defaultColors = this.colorService.getDefaultColorsHex(5);

  // Dostupné barvy
  allColors = this.colorService.availableColors;
}
```

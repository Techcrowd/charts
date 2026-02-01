# Donut Chart

## Inputs

| Input | Typ | Default | Popis |
|-------|-----|---------|-------|
| `[data]` | DonutChartDataItem[] | [] | Data pro graf |
| `[colors]` | ChartColor[] | výchozí paleta | Vlastní barvy z palety |
| `[height]` | number | 280 | Výška grafu v px |
| `[centerText]` | string | - | Text uprostřed grafu |
| `[showDataLabels]` | boolean | true | Zobrazit hodnoty na výsečích |
| `[showTooltip]` | boolean | false | Zobrazit tooltip |
| `[showLegend]` | boolean | true | Zobrazit legendu |
| `[showLegendValues]` | boolean | false | Zobrazit hodnoty v legendě |
| `[valueFormat]` | 'percent' \| 'absolute' | 'percent' | Formát hodnot |
| `[minValue]` | number | - | Min. hodnota pro seskupení do "Ostatní" |
| `[loading]` | boolean | false | Loading stav |
| `[nonce]` | string | - | CSP nonce pro inline styly |
| `[skeletonLegendCount]` | number | 4 | Počet skeleton položek legendy |

## Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `(segmentClick)` | { item: DonutChartDataItem, index: number } | Kliknutí na segment |
| `(segmentHover)` | { item: DonutChartDataItem, index: number } \| null | Hover nad segmentem |

## Příklad použití

```html
<co-donut-chart
  [data]="chartData"
  [height]="300"
  [showLegend]="true"
  [showLegendValues]="true"
  [valueFormat]="'percent'"
  [centerText]="'Portfolio'"
  (segmentClick)="onSegmentClick($event)"
/>
```

## Ukázka dat

```typescript
const chartData: DonutChartDataItem[] = [
  { label: 'Akcie', value: 45000 },
  { label: 'Dluhopisy', value: 30000 },
  { label: 'Hotovost', value: 15000 },
  { label: 'Alternativy', value: 10000 },
];
```

## Typy

```typescript
interface DonutChartDataItem {
  label: string;
  value: number;
}
```

---

# Bar Chart

## Inputs

| Input | Typ | Default | Popis |
|-------|-----|---------|-------|
| `[data]` | BarChartData | { categories: [], series: [] } | Data pro graf |
| `[colors]` | ChartColor[] | výchozí paleta | Vlastní barvy z palety |
| `[height]` | number | 300 | Výška grafu v px |
| `[showDataLabels]` | boolean | true | Zobrazit hodnoty na barech |
| `[showTooltip]` | boolean | false | Zobrazit tooltip |
| `[showLegend]` | boolean | false | Zobrazit legendu |
| `[showGrid]` | boolean | true | Zobrazit grid |
| `[valueFormat]` | 'percent' \| 'absolute' | 'absolute' | Formát hodnot |
| `[xAxisTitle]` | string | - | Titulek X osy |
| `[valueUnit]` | string | - | Jednotka pro hodnoty (v tooltipu) |
| `[loading]` | boolean | false | Loading stav |
| `[nonce]` | string | - | CSP nonce pro inline styly |
| `[skeletonRowCount]` | number | 5 | Počet skeleton řádků |
| `[skeletonSeriesCount]` | number | 1 | Počet skeleton sérií |

## Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `(barClick)` | { seriesIndex, dataPointIndex, value, category, seriesName } | Kliknutí na bar |
| `(barHover)` | { seriesIndex, dataPointIndex, value, category, seriesName } \| null | Hover nad barem |

## Příklad použití

```html
<co-bar-chart
  [data]="chartData"
  [height]="350"
  [showLegend]="true"
  [showDataLabels]="true"
  [valueUnit]="'Kč'"
  (barClick)="onBarClick($event)"
/>
```

## Ukázka dat

```typescript
const chartData: BarChartData = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Příjmy', data: [44000, 55000, 41000, 67000] },
    { name: 'Výdaje', data: [35000, 42000, 38000, 51000] },
  ],
};
```

## Typy

```typescript
interface BarChartData {
  categories: string[];
  series: BarChartSeries[];
}

interface BarChartSeries {
  name: string;
  data: number[];
}
```

---

# Column Chart

## Inputs

| Input | Typ | Default | Popis |
|-------|-----|---------|-------|
| `[data]` | ColumnChartData | { categories: [], series: [] } | Data pro graf |
| `[colors]` | ChartColor[] | výchozí paleta | Vlastní barvy z palety |
| `[height]` | number | 300 | Výška grafu v px |
| `[showDataLabels]` | boolean | true | Zobrazit hodnoty na sloupcích |
| `[showTooltip]` | boolean | false | Zobrazit tooltip |
| `[showLegend]` | boolean | false | Zobrazit legendu |
| `[valueFormat]` | 'percent' \| 'absolute' | 'absolute' | Formát hodnot |
| `[yAxisTitle]` | string | - | Titulek Y osy |
| `[valueUnit]` | string | - | Jednotka pro hodnoty (v tooltipu) |
| `[loading]` | boolean | false | Loading stav |
| `[nonce]` | string | - | CSP nonce pro inline styly |
| `[skeletonColumnCount]` | number | 6 | Počet skeleton sloupců |
| `[skeletonSeriesCount]` | number | 3 | Počet skeleton sérií |

## Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `(columnClick)` | { seriesIndex, dataPointIndex, value, category, seriesName } | Kliknutí na sloupec |
| `(columnHover)` | { seriesIndex, dataPointIndex, value, category, seriesName } \| null | Hover nad sloupcem |

## Příklad použití

```html
<co-column-chart
  [data]="chartData"
  [height]="300"
  [showLegend]="true"
  [colors]="['chart-stocks', 'chart-bonds', 'chart-cash']"
  [valueUnit]="'%'"
  (columnClick)="onColumnClick($event)"
/>
```

## Ukázka dat

```typescript
const chartData: ColumnChartData = {
  categories: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn'],
  series: [
    { name: 'Akcie', data: [35, 41, 36, 26, 45, 48] },
    { name: 'Dluhopisy', data: [28, 29, 33, 36, 32, 32] },
    { name: 'Hotovost', data: [12, 11, 14, 18, 17, 13] },
  ],
};
```

## Typy

```typescript
interface ColumnChartData {
  categories: string[];
  series: ColumnChartSeries[];
}

interface ColumnChartSeries {
  name: string;
  data: number[];
}
```

---

# Value Performance Chart

## Inputs

| Input | Typ | Default | Popis |
|-------|-----|---------|-------|
| `[lines]` | ChartLine[] | [] | Pole čar - každá čára obsahuje svou definici i data |
| `[height]` | number | 300 | Výška grafu v px |
| `[showHighLowValues]` | boolean | true | Zobrazit high/low anotace |
| `[showLegend]` | boolean | false | Zobrazit legendu |
| `[showTooltip]` | boolean | false | Zobrazit tooltip |
| `[showGrid]` | boolean | false | Zobrazit mřížku |
| `[showYAxis]` | boolean | false | Zobrazit Y osu |
| `[xAxisMin]` | Date \| number \| string | - | Min. hodnota osy X |
| `[xAxisMax]` | Date \| number \| string | - | Max. hodnota osy X (pro neúplné intervaly) |
| `[valueUnit]` | string | '' | Jednotka hodnoty (měna) |
| `[dateFormat]` | string | 'dd.MM.yyyy' | Formát datumu (dd, MM, MMM, yyyy, HH, mm) |
| `[loading]` | boolean | false | Loading stav |
| `[nonce]` | string | - | CSP nonce pro inline styly |

## Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `(pointHover)` | { timestamp, values: { name, value }[] } \| null | Hover nad bodem - obsahuje hodnoty ze všech čar |
| `(pointClick)` | { timestamp, values: { name, value }[] } | Kliknutí na bod |

## Příklad použití

### Základní graf s jednou čárou

```html
<co-value-performance-chart
  [height]="300"
  [lines]="valueLines"
  [dateFormat]="'MMM yyyy'"
  [valueUnit]="'Kč'"
/>
```

### Graf s hodnotou a investovanou částkou

```html
<co-value-performance-chart
  [height]="350"
  [showLegend]="true"
  [lines]="lines"
  [dateFormat]="'yyyy'"
  [valueUnit]="'Kč'"
  (pointHover)="onPointHover($event)"
/>
```

### Neúplný interval (data končí dříve než osa X)

```html
<co-value-performance-chart
  [height]="300"
  [lines]="incompleteLines"
  [xAxisMin]="'2025-01-01'"
  [xAxisMax]="'2025-01-31'"
  [dateFormat]="'dd.MM'"
  [valueUnit]="'Kč'"
/>
```

## Ukázka dat

```typescript
// Data pro čáru hodnoty
const valueData: ChartDataPoint[] = [
  { x: '2023-01-01', y: 100000 },
  { x: '2023-02-01', y: 105000 },
  { x: '2023-03-01', y: 102000 },
  { x: '2023-04-01', y: 115000 },
  { x: '2023-05-01', y: 125000 },
  { x: '2023-06-01', y: 135000 },
];

// Data pro čáru investované částky
const investedData: ChartDataPoint[] = [
  { x: '2023-01-01', y: 100000 },
  { x: '2023-02-01', y: 100000 },
  { x: '2023-03-01', y: 100000 },
  { x: '2023-04-01', y: 110000 },
  { x: '2023-05-01', y: 110000 },
  { x: '2023-06-01', y: 120000 },
];

// Konfigurace čar s vlastními daty
const lines: ChartLine[] = [
  {
    name: 'Investováno',
    color: 'chart-out',
    curveType: 'stepline',
    data: investedData
  },
  {
    name: 'Hodnota portfolia',
    color: 'chart-in',
    curveType: 'straight',
    data: valueData
  },
];

// Pouze hodnota (jedna čára)
const valueLines: ChartLine[] = [
  {
    name: 'Hodnota',
    color: 'chart-in',
    curveType: 'straight',
    data: valueData
  },
];
```

## Typy

```typescript
/** Datový bod pro čáru grafu */
interface ChartDataPoint {
  x: Date | number | string;
  y: number;
}

/** Konfigurace jedné čáry grafu - obsahuje definici i data */
interface ChartLine {
  name: string;
  color: ChartColor;
  curveType: 'smooth' | 'straight' | 'stepline';
  data: ChartDataPoint[];
}

type TimeInterval = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL';
```

---

# Společné typy

```typescript
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

type ValueFormat = 'absolute' | 'percent';
```

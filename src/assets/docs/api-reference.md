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

# Společné typy

```typescript
type ChartColor =
  | 'chart-stocks'
  | 'chart-bonds'
  | 'chart-alternatives'
  | 'chart-cash'
  | 'chart-in'
  | 'chart-out'
  | 'chart-rest'
  | 'chart-misc-1'
  | 'chart-misc-2'
  | 'chart-misc-3';

type ValueFormat = 'absolute' | 'percent';
```

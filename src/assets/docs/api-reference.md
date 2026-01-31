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
| `[skeletonLegendCount]` | number | 4 | Počet skeleton položek legendy |

## Outputs

| Output | Typ | Popis |
|--------|-----|-------|
| `(segmentClick)` | item: DonutChartDataItem, index: number | Kliknutí na segment |
| `(segmentHover)` | item: DonutChartDataItem, index: number \| null | Hover nad segmentem |

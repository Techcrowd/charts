# Changelog

## 2026-07-16

### Changed
- `co-column-chart-v2` — odsazení popisků os dle specu, změřeno v DOM: osa Y 4 px od linie (`offsetX: -6`), osa X 12 px od osy (8 px odsazení + 4 px top padding labelu, `offsetY: -1.25`; offsetY se promítá ~2×)
- `ZMENY-NAVOD.html` bod 4 — postup pro produkci: offsety os + měřicí DevTools skript + varování před CSS transform na `.apexcharts-xaxis-texts-g` (přepíše SVG transform atribut)

## 2026-07-15

### Added
- `co-column-chart-v2` — replika produkční `CoColumnChartV2Component` (golem-ng `chart-v2/column-chart`) podle fotek produkčního kódu: `applyColumnGap()` (mezera 4 px ve skupině přes translateX), transparentní stroke, šířky sloupců dle počtu sérií, tooltip vlevo se šipkou, inputy `showLegendValues` / `showYAxisLabels` / `legendValues` / `legendInteractive`
- Stránka `/column-chart-v2` s ukázkami a přehledem rozdílů oproti V1
- `ChartLegendItem.displayValue` — volitelná vlastní zobrazená hodnota v legendě (parita s produkcí)
- `V2-ROZDILY-OPROTI-PRODUKCI.html` — dokumentace odchylek demo repliky oproti produkčnímu originálu
- `ZMENY-NAVOD.html` bod 3 — krok-za-krokem návod pro produkci: hover aktivuje jen danou skupinu (HTML + SCSS + TS `highlightBars()`)

### Changed
- `co-column-chart` (V1) — hover na sloupec aktivuje jen danou skupinu, ne celý graf (odstraněn class binding `--hovering` a SCSS blok `chart-hover-dimming`)

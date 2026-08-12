# Changelog

## 2026-08-12

### Added
- `co-horizontal-chart` — nový typ grafu dle Figma specu CO Chart v4.0 se třemi variantami: **HorizontalAccount** (toky na účtu — bar 8 px + ikona směru in/out + label + hodnota, barvy chart-in/chart-out), **HorizontalSavings** (průběh spoření — bar 8 px + $label $value / $maxLabel $maxValue), **HorizontalInvestments** (segmentovaný bar 16 px bez labelů, šířka dle podílu na celku, minSectionPercent pro malé sekce). Hodnoty fontem body-secondary-bold. Každá varianta má vlastní skeleton loading stav. Čisté CSS bez ApexCharts.
- `co-icon` — nová komponenta ikon dle Golem DS (zatím arrow-left, arrow-right); použitá pro směrové šipky v co-horizontal-chart (14×14 px)
- `co-horizontal-chart` investments — hover efekt: aktivní segment se zvětší na 24 px, ostatní se potlačí (50% průhlednost, stejně jako u ostatních grafů)
- Stránka `/horizontal-chart` s ukázkami všech variant, loading stavů a vlastních barev
- Showcase: katalogová položka `CO Chart V4 Horizontal` (inputs, code examples) + živé demo `HorizontalChartDemoComponent` v DEMO_REGISTRY

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

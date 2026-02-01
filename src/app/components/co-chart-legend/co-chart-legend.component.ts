import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { ValueFormat } from '../../shared/chart-types';

/** Item pro legendu */
export interface ChartLegendItem {
  label: string;
  value: number;
  color: string;
  percent: number;
}

// ============ COMPONENT ============

@Component({
  selector: 'co-chart-legend',
  standalone: true,
  templateUrl: './co-chart-legend.component.html',
  styleUrls: ['./co-chart-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoChartLegendComponent {
  // ============ INJECTED ============
  private dateTimeService = inject(DateTimeService);

  // ============ INPUTS ============

  /** Data pro legendu */
  @Input() items: ChartLegendItem[] = [];

  /** Zobrazit hodnoty */
  @Input() showValues = false;

  /** Formát hodnot */
  @Input() valueFormat: ValueFormat = 'percent';

  /** Index aktuálně zvýrazněného itemu (z vnějšku) */
  @Input() highlightedIndex = -1;

  /** Povolit interakci (hover/click) */
  @Input() interactive = true;

  // ============ OUTPUTS ============

  /** Emituje při hoveru nad položkou */
  @Output() itemHover = new EventEmitter<number>();

  /** Emituje při opuštění položky */
  @Output() itemLeave = new EventEmitter<void>();

  /** Emituje při kliknutí na položku */
  @Output() itemClick = new EventEmitter<{ item: ChartLegendItem; index: number }>();

  // ============ INTERNAL STATE ============

  hoveredIndex = -1;

  // ============ COMPUTED ============

  private get activeIndex(): number {
    return this.highlightedIndex !== -1 ? this.highlightedIndex : this.hoveredIndex;
  }

  // ============ METHODS ============

  formatValue(item: ChartLegendItem): string {
    if (this.valueFormat === 'percent') {
      return `${item.percent.toFixed(1)}%`;
    }
    return this.dateTimeService.formatNumber(item.value, 0);
  }

  onItemHover(index: number): void {
    if (!this.interactive) return;
    this.hoveredIndex = index;
    this.itemHover.emit(index);
  }

  onItemLeave(): void {
    if (!this.interactive) return;
    this.hoveredIndex = -1;
    this.itemLeave.emit();
  }

  onItemClick(index: number): void {
    if (!this.interactive) return;
    this.itemClick.emit({ item: this.items[index], index });
  }

  isActive = (index: number): boolean => this.activeIndex === index;

  isDimmed = (index: number): boolean => this.activeIndex !== -1 && this.activeIndex !== index;

  trackByLabel(index: number, item: ChartLegendItem): string {
    return item.label;
  }
}

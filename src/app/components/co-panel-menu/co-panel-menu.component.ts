import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

// ============ TYPES ============

export interface PanelMenu {
  icon?: string;
  label: string;
  items?: PanelMenu[];
  routerLink?: string;
  expanded?: boolean;
  expandable?: boolean;
}

// ============ COMPONENT ============

@Component({
  selector: 'co-panel-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './co-panel-menu.component.html',
  styleUrls: ['./co-panel-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoPanelMenuComponent implements OnInit {
  // ============ INPUTS ============

  /** Oblíbené položky (zobrazí se v sekci Oblíbené) */
  @Input() favoriteItems: PanelMenu[] = [];

  /** Položky hlavního menu */
  @Input() overviewItems: PanelMenu[] = [];

  /** Loading stav - zobrazí skeleton */
  @Input() isLoading = false;

  /** Výchozí aktivní položka (label) */
  @Input() defaultActiveItem?: string;

  /** Výchozí aktivní podpoložka (label) */
  @Input() defaultActiveSubItem?: string;

  /** Zobrazit ikony oblíbených (hvězdičky) */
  @Input() showFavoriteIcons = true;

  // ============ OUTPUTS ============

  /** Emituje při kliknutí na položku s routerLink */
  @Output() itemClick = new EventEmitter<PanelMenu>();

  /** Emituje při přidání/odebrání z oblíbených */
  @Output() favoriteToggle = new EventEmitter<PanelMenu>();

  // ============ INTERNAL STATE ============

  readonly activeItem$ = new BehaviorSubject<PanelMenu | null>(null);
  readonly activeSubItem$ = new BehaviorSubject<PanelMenu | null>(null);
  readonly expandedItems$ = new BehaviorSubject<Set<PanelMenu>>(new Set());
  readonly overviewActive$ = new BehaviorSubject<boolean>(false);

  readonly skeletonItems = [0, 1, 2, 3, 4];

  // ============ METHODS ============

  ngOnInit(): void {
    if (this.defaultActiveItem) {
      const item = this.overviewItems.find(i => i.label === this.defaultActiveItem);
      if (item) {
        this.activeItem$.next(item);
        if (item.expandable) {
          const next = new Set(this.expandedItems$.getValue());
          next.add(item);
          this.expandedItems$.next(next);
        }
      }
    }
    if (this.defaultActiveSubItem && this.activeItem$.getValue()) {
      const parent = this.activeItem$.getValue()!;
      const sub = parent.items?.find(i => i.label === this.defaultActiveSubItem);
      if (sub) this.activeSubItem$.next(sub);
    }
  }

  toggleExpand(item: PanelMenu): void {
    if (!this.isItemExpandable(item)) {
      this.setActiveItem(item);
      return;
    }

    const current = this.expandedItems$.getValue();
    const next = new Set(current);
    if (next.has(item)) {
      next.delete(item);
    } else {
      next.add(item);
    }
    this.expandedItems$.next(next);

    this.setActiveItem(item);
  }

  setActiveItem(item: PanelMenu): void {
    this.activeItem$.next(item);
    this.activeSubItem$.next(null);
    this.overviewActive$.next(false);

    if (item.routerLink) {
      this.itemClick.emit(item);
    }
  }

  setActiveSubItem(item: PanelMenu, subItem: PanelMenu): void {
    this.activeItem$.next(item);
    this.activeSubItem$.next(subItem);
    this.overviewActive$.next(false);

    if (subItem.routerLink) {
      this.itemClick.emit(subItem);
    }
  }

  setOverviewActive(): void {
    this.overviewActive$.next(true);
    this.activeItem$.next(null);
    this.activeSubItem$.next(null);
    this.itemClick.emit({ label: 'Přehled', routerLink: '/overview' });
  }

  isExpanded(item: PanelMenu): boolean {
    return this.expandedItems$.getValue().has(item);
  }

  isItemExpandable(item: PanelMenu): boolean {
    if (item.expandable !== undefined) return item.expandable;
    return !!(item.items && item.items.length > 0);
  }

  isActive(item: PanelMenu): boolean {
    return this.activeItem$.getValue() === item;
  }

  isSubActive(subItem: PanelMenu): boolean {
    return this.activeSubItem$.getValue() === subItem;
  }

  toggleFavoriteToFirst(item: PanelMenu): void {
    this.favoriteToggle.emit(item);
  }

  isFavorite(item: PanelMenu): boolean {
    return this.favoriteItems.some(f => f.label === item.label);
  }
}

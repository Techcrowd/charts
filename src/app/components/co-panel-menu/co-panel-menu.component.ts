import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

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
  templateUrl: './co-panel-menu.component.html',
  styleUrls: ['./co-panel-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoPanelMenuComponent {
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

  activeItem = signal<PanelMenu | null>(null);
  activeSubItem = signal<PanelMenu | null>(null);
  expandedItems = signal<Set<PanelMenu>>(new Set());
  isExpandedLoading = signal<boolean[]>([false, false]);
  overviewActive = signal(false);

  readonly skeletonItems = [0, 1, 2, 3, 4];

  // ============ METHODS ============

  ngOnInit(): void {
    if (this.defaultActiveItem) {
      const item = this.overviewItems.find(i => i.label === this.defaultActiveItem);
      if (item) {
        this.activeItem.set(item);
        if (item.expandable) {
          this.expandedItems.update(set => {
            const next = new Set(set);
            next.add(item);
            return next;
          });
        }
      }
    }
    if (this.defaultActiveSubItem && this.activeItem()) {
      const parent = this.activeItem()!;
      const sub = parent.items?.find(i => i.label === this.defaultActiveSubItem);
      if (sub) this.activeSubItem.set(sub);
    }
  }

  toggleExpand(item: PanelMenu): void {
    if (!this.isItemExpandable(item)) {
      this.setActiveItem(item);
      return;
    }

    this.expandedItems.update(set => {
      const next = new Set(set);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });

    this.setActiveItem(item);
  }

  setActiveItem(item: PanelMenu): void {
    this.activeItem.set(item);
    this.activeSubItem.set(null);
    this.overviewActive.set(false);

    if (item.routerLink) {
      this.itemClick.emit(item);
    }
  }

  setActiveSubItem(item: PanelMenu, subItem: PanelMenu): void {
    this.activeItem.set(item);
    this.activeSubItem.set(subItem);
    this.overviewActive.set(false);

    if (subItem.routerLink) {
      this.itemClick.emit(subItem);
    }
  }

  setOverviewActive(): void {
    this.overviewActive.set(true);
    this.activeItem.set(null);
    this.activeSubItem.set(null);
    this.itemClick.emit({ label: 'Přehled', routerLink: '/overview' });
  }

  isExpanded(item: PanelMenu): boolean {
    return this.expandedItems().has(item);
  }

  isItemExpandable(item: PanelMenu): boolean {
    if (item.expandable !== undefined) return item.expandable;
    return !!(item.items && item.items.length > 0);
  }

  isActive(item: PanelMenu): boolean {
    return this.activeItem() === item;
  }

  isSubActive(subItem: PanelMenu): boolean {
    return this.activeSubItem() === subItem;
  }

  toggleFavoriteToFirst(item: PanelMenu): void {
    this.favoriteToggle.emit(item);
  }

  isFavorite(item: PanelMenu): boolean {
    return this.favoriteItems.some(f => f.label === item.label);
  }
}

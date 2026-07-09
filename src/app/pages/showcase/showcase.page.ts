import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SHOWCASE_CATALOG,
  ComponentCategory,
  slugify,
} from '../../data/showcase-catalog';
import { SCREENSHOT_MAP } from '../../data/showcase-screenshots';

interface CategoryGroup {
  category: ComponentCategory;
  count: number;
}

@Component({
  selector: 'app-showcase-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './showcase.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcasePage {
  private readonly catalog = SHOWCASE_CATALOG;

  readonly totalCount = this.catalog.length;
  readonly searchQuery = signal('');
  readonly activeCategory = signal<ComponentCategory | null>(null);
  readonly slugify = slugify;

  readonly categories: CategoryGroup[] = Object.values(ComponentCategory).map(cat => ({
    category: cat,
    count: this.catalog.filter(c => c.category === cat).length,
  }));

  readonly filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.activeCategory();

    return this.catalog.filter(comp => {
      if (category && comp.category !== category) return false;
      if (query) {
        const searchable = [
          comp.name,
          comp.description ?? '',
          ...(comp.variants ?? []),
        ].join(' ').toLowerCase();
        return searchable.includes(query);
      }
      return true;
    });
  });

  hasScreenshot(name: string): boolean {
    return !!(SCREENSHOT_MAP[name]?.length);
  }

  getThumb(name: string): string | null {
    const shots = SCREENSHOT_MAP[name];
    return shots?.length ? 'assets/showcase/' + shots[0] : null;
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  setCategory(category: ComponentCategory | null): void {
    this.activeCategory.set(category);
  }
}

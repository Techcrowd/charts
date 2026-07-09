import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, Type } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs';
import {
  SHOWCASE_CATALOG,
  ShowcaseComponent,
  ComponentCategory,
  findBySlug,
  slugify,
} from '../../data/showcase-catalog';
import { SCREENSHOT_MAP } from '../../data/showcase-screenshots';
import { DEMO_REGISTRY } from './demos/demo-registry';
import { FallbackDemoComponent } from './demos/fallback-demo.component';

interface CategoryGroup {
  category: ComponentCategory;
  components: ShowcaseComponent[];
}

@Component({
  selector: 'app-showcase-detail-page',
  standalone: true,
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './showcase-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly highlightCache = new Map<string, SafeHtml>();

  readonly darkMode = signal(false);
  readonly lightboxImage = signal<string | null>(null);
  readonly copiedIndex = signal<number | null>(null);
  readonly sidebarSearch = signal('');
  readonly activeVariant = signal<string | null>(null);
  readonly slugify = slugify;

  // Reactive slug from route params
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(p => p.get('slug') ?? '')),
    { initialValue: '' }
  );

  // Reactive component lookup
  readonly comp = computed(() => findBySlug(this.slug()));

  readonly screenshots = computed(() => {
    const c = this.comp();
    return c ? (SCREENSHOT_MAP[c.name] ?? []) : [];
  });

  // Dynamic demo component resolution
  readonly demoComponent = computed<Type<unknown>>(() => {
    const c = this.comp();
    if (!c) return FallbackDemoComponent;
    return DEMO_REGISTRY[c.name] ?? FallbackDemoComponent;
  });

  readonly demoInputs = computed<Record<string, unknown>>(() => {
    const c = this.comp();
    if (!c) return {};
    // Pass componentName to FallbackDemoComponent
    if (!DEMO_REGISTRY[c.name]) {
      return { componentName: c.name };
    }
    return {};
  });

  readonly hasRealDemo = computed(() => {
    const c = this.comp();
    return c ? !!DEMO_REGISTRY[c.name] : false;
  });

  // Build category groups once (static data)
  readonly categoryGroups: CategoryGroup[];

  readonly filteredGroups = computed(() => {
    const q = this.sidebarSearch().toLowerCase().trim();
    if (!q) return this.categoryGroups;
    return this.categoryGroups
      .map(g => ({
        ...g,
        components: g.components.filter(c => c.name.toLowerCase().includes(q)),
      }))
      .filter(g => g.components.length > 0);
  });

  constructor() {
    // Build category groups for sidebar (static)
    const grouped = new Map<ComponentCategory, ShowcaseComponent[]>();
    for (const c of SHOWCASE_CATALOG) {
      const list = grouped.get(c.category) ?? [];
      list.push(c);
      grouped.set(c.category, list);
    }
    this.categoryGroups = Array.from(grouped.entries()).map(([category, components]) => ({
      category,
      components,
    }));

    // Reset variant when component changes
    effect(() => {
      const c = this.comp();
      if (c?.variants?.length) {
        this.activeVariant.set(c.variants[0]);
      } else {
        this.activeVariant.set(null);
      }
    });
  }

  onSidebarSearch(event: Event): void {
    this.sidebarSearch.set((event.target as HTMLInputElement).value);
  }

  setVariant(variant: string): void {
    this.activeVariant.set(variant);
  }

  openLightbox(img: string): void {
    this.lightboxImage.set('assets/showcase/' + img);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  copyCode(text: string, index: number): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedIndex.set(index);
      setTimeout(() => {
        if (this.copiedIndex() === index) {
          this.copiedIndex.set(null);
        }
      }, 2000);
    });
  }

  highlightHtml(code: string): SafeHtml {
    let cached = this.highlightCache.get(code);
    if (cached) return cached;

    // Escape HTML entities
    let h = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    // Process complete HTML tags: &lt;tagname attrs...&gt;
    // Handles opening, closing, self-closing tags with named + boolean attributes
    h = h.replace(/&lt;(\/?)([\w-]+)([\s\S]*?)(\/?&gt;)/g,
      (_, slash, tag, attrs, close) => {
        let r = '<span class="hl-bracket">&lt;' + slash + '</span>'
              + '<span class="hl-tag">' + tag + '</span>';

        if (attrs) {
          // Process named attrs first, then boolean attrs in the gaps between them
          const namedRe = /([\w\[\]\(\)\*#.\-]+)(=)(&quot;)([\s\S]*?)(&quot;)/g;
          let last = 0;
          let m: RegExpExecArray | null;

          while ((m = namedRe.exec(attrs)) !== null) {
            // Gap before this named attr — highlight boolean attrs (standalone words)
            const gap = attrs.slice(last, m.index);
            r += gap.replace(/([\w][\w-]*)/g, '<span class="hl-attr">$1</span>');
            // Named attr: name + = + "value"
            r += '<span class="hl-attr">' + m[1] + '</span>'
               + m[2]
               + '<span class="hl-value">' + m[3] + m[4] + m[5] + '</span>';
            last = namedRe.lastIndex;
          }

          // Remaining gap after last named attr — boolean attrs
          const tail = attrs.slice(last);
          r += tail.replace(/([\w][\w-]*)/g, '<span class="hl-attr">$1</span>');
        }

        r += '<span class="hl-bracket">' + close + '</span>';
        return r;
      }
    );

    cached = this.sanitizer.bypassSecurityTrustHtml(h);
    this.highlightCache.set(code, cached);
    return cached;
  }
}

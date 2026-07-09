import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PREVIEW_MAP } from '../../../data/showcase-previews';

@Component({
  selector: 'app-fallback-demo',
  standalone: true,
  template: `
    @if (previewHtml) {
      <div [innerHTML]="previewHtml"></div>
    } @else {
      <div class="placeholder">
        <span class="placeholder-icon">&#128736;</span>
        <span>Preview not yet available for this component.</span>
        <span class="placeholder-hint">Real Angular component is in development.</span>
      </div>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      padding: 20px;
      background: $color-background-surface-secondary;
      border-radius: $border-radius-lg;
      border: 1px solid $color-background-border;
    }

    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 32px 20px;
      color: $color-content-tertiary;
      font-size: $font-size-sm;
      text-align: center;
    }

    .placeholder-icon {
      font-size: 32px;
    }

    .placeholder-hint {
      font-size: $font-size-xs;
      color: $color-content-quaternary;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackDemoComponent {
  readonly componentName = input('');

  private readonly sanitizer = inject(DomSanitizer);

  get previewHtml(): SafeHtml | null {
    const raw = PREVIEW_MAP[this.componentName()];
    if (!raw) return null;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}

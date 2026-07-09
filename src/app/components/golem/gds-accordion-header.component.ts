import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';

@Component({
  selector: 'gds-accordion-header',
  standalone: true,
  template: `
    <div class="header" (click)="toggle()">
      <span class="arrow" [class.arrow--open]="isExpanded()">&#9654;</span>
      <span class="title">{{ title() }}</span>
      @if (headerActionButtonIcon()) {
        <span class="action-icon" (click)="headerButtonClick.emit(); $event.stopPropagation()">
          {{ headerActionButtonIcon() }}
        </span>
      }
      @if (secondaryButtonLabel()) {
        <button class="secondary-btn" (click)="secondaryButtonClick.emit(); $event.stopPropagation()">
          {{ secondaryButtonLabel() }}
        </button>
      }
    </div>
    @if (isExpanded()) {
      <div class="body">
        <ng-content />
      </div>
    }
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      background: $color-background-surface;
      border-radius: $border-radius-lg;
      overflow: hidden;
      font-family: $font-family-base;
      border-bottom: 1px solid $color-background-surface-secondary;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      cursor: pointer;
    }

    .arrow {
      font-size: 12px;
      color: $color-content-tertiary;
      transition: transform 150ms ease;
      flex-shrink: 0;

      &--open {
        transform: rotate(90deg);
      }
    }

    .title {
      flex: 1;
      font-size: $font-size-md;
      font-weight: $font-weight-semibold;
      color: $color-content-primary;
    }

    .action-icon {
      font-size: 14px;
      color: $color-content-tertiary;
      cursor: pointer;
    }

    .secondary-btn {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border: 1.5px solid $color-background-border;
      border-radius: $border-radius-full;
      background: transparent;
      font-family: $font-family-base;
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      color: $color-interactive-secondary;
      cursor: pointer;
    }

    .body {
      padding: 0 16px 14px;
      font-size: $font-size-sm;
      color: $color-content-secondary;
      line-height: $line-height-relaxed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsAccordionHeaderComponent {
  readonly title = input('');
  readonly headerActionButtonIcon = input('');
  readonly secondaryButtonLabel = input('');
  readonly isExpanded = model(false);
  readonly isLoading = input(false);

  readonly headerButtonClick = output<void>();
  readonly secondaryButtonClick = output<void>();
  readonly toggleHeader = output<boolean>();

  toggle(): void {
    this.isExpanded.set(!this.isExpanded());
    this.toggleHeader.emit(this.isExpanded());
  }
}

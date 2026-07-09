import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';

@Component({
  selector: 'gds-switch',
  standalone: true,
  template: `
    <div class="switch-wrap" (click)="toggle()">
      @if (label()) {
        <div class="switch-content">
          <span class="switch-label">{{ label() }}</span>
          @if (caption()) {
            <span class="switch-caption">{{ caption() }}</span>
          }
        </div>
      }
      <div class="switch-track" [class.switch-track--on]="checked()">
        <div class="switch-thumb"></div>
      </div>
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: block;
      font-family: $font-family-base;
    }

    .switch-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      cursor: pointer;
    }

    .switch-content {
      flex: 1;
      min-width: 0;
    }

    .switch-label {
      display: block;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      color: $color-content-primary;
    }

    .switch-caption {
      display: block;
      font-size: $font-size-sm;
      color: $color-content-tertiary;
      margin-top: 2px;
    }

    .switch-track {
      position: relative;
      width: 48px;
      height: 28px;
      background: $color-background-border;
      border-radius: 14px;
      flex-shrink: 0;
      transition: background 150ms ease;

      &--on {
        background: $color-interactive-primary;

        .switch-thumb {
          transform: translateX(20px);
        }
      }
    }

    .switch-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 22px;
      height: 22px;
      background: $color-background-surface;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 150ms ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsSwitchComponent {
  readonly label = input('');
  readonly caption = input('');
  readonly checked = model(false);
  readonly changed = output<boolean>();

  toggle(): void {
    this.checked.set(!this.checked());
    this.changed.emit(this.checked());
  }
}

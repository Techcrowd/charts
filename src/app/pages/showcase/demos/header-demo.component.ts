import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsHeaderComponent } from '../../../components/golem';

@Component({
  selector: 'app-header-demo',
  standalone: true,
  imports: [GdsHeaderComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Ground</div>
      <gds-header variant="ground" title="$title" />
    </div>

    <div class="demo-section">
      <div class="demo-label">Navigation menu</div>
      <gds-header variant="navigation-menu" title="$title" [showBack]="true">
        <span slot="right" style="font-size:20px;cursor:pointer">&#9776;</span>
      </gds-header>
    </div>

    <div class="demo-section">
      <div class="demo-label">Flow and Dialog</div>
      <gds-header variant="flow-dialog" title="Step 1 of 3">
        <span slot="right" style="font-size:20px;cursor:pointer">&times;</span>
      </gds-header>
    </div>

    <div class="demo-section">
      <div class="demo-label">Bottom Sheet</div>
      <gds-header variant="bottom-sheet" title="$title">
        <span slot="right" style="font-size:20px;cursor:pointer">&times;</span>
      </gds-header>
    </div>

    <div class="demo-section">
      <div class="demo-label">Back button preset</div>
      <gds-header variant="nav" title="Detail" [showBack]="true" />
    </div>
  `,
  styles: [`
    @use 'tokens' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      background: $color-background-surface-secondary;
      border-radius: $border-radius-lg;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .demo-label {
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
      color: $color-content-tertiary;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDemoComponent {}

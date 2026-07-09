import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GdsAccordionHeaderComponent } from '../../../components/golem';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [GdsAccordionHeaderComponent],
  template: `
    <div class="demo-section">
      <div class="demo-label">Basic accordion (click to expand)</div>
      <gds-accordion-header title="Section Title" [isExpanded]="true">
        <p>Accordion body content - collapsible section that can be toggled open and closed.</p>
      </gds-accordion-header>
    </div>

    <div class="demo-section">
      <div class="demo-label">With secondary button</div>
      <gds-accordion-header title="Settings" secondaryButtonLabel="Edit" headerActionButtonIcon="&#9432;">
        <p>Settings content with action button and secondary button in the header.</p>
      </gds-accordion-header>
    </div>

    <div class="demo-section">
      <div class="demo-label">Collapsed (click to expand)</div>
      <gds-accordion-header title="More Information">
        <p>This content is hidden by default. Click the header to reveal it.</p>
      </gds-accordion-header>
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
export class AccordionDemoComponent {}

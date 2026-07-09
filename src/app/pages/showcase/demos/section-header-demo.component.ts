import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-header-demo',
  standalone: true,
  templateUrl: './section-header-demo.component.html',
  styleUrl: './section-header-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderDemoComponent {}

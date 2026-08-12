import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// ============ TYPES ============

/** Podporované ikony — rozšiřovat dle potřeby dle Golem DS */
export type CoIconName = 'arrow-left' | 'arrow-right';

// ============ COMPONENT ============

@Component({
  selector: 'co-icon',
  standalone: true,
  templateUrl: './co-icon.component.html',
  styleUrls: ['./co-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoIconComponent {
  /** Název ikony */
  @Input({ required: true }) name: CoIconName = 'arrow-right';

  /** Velikost v px (šířka i výška) */
  @Input() size = 16;
}

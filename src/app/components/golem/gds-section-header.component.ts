import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
  DestroyRef,
  inject,
  afterNextRender,
} from '@angular/core';
import { GdsAvatarComponent } from './gds-avatar.component';

@Component({
  selector: 'gds-section-header',
  standalone: true,
  imports: [GdsAvatarComponent],
  templateUrl: './gds-section-header.component.html',
  styleUrl: './gds-section-header.component.scss',
  host: {
    '[class.multi-line]': 'isMultiLine()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GdsSectionHeaderComponent {
  readonly title = input('');
  readonly avatarIcon = input('Person');
  readonly showMicrobutton = input(true);

  readonly microbuttonClick = output<void>();

  readonly isMultiLine = signal(false);

  private readonly titleRef = viewChild.required<ElementRef<HTMLElement>>('titleEl');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const el = this.titleRef().nativeElement;

      const check = () => {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        this.isMultiLine.set(lineHeight > 0 && el.scrollHeight > lineHeight * 1.5);
      };

      check();

      const observer = new ResizeObserver(() => check());
      observer.observe(el);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

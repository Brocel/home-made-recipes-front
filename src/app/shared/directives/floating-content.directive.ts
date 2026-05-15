import { Directive, HostListener, inject } from '@angular/core';
import { FloatingSurface } from '@ui/layout/floating-surface/floating-surface';

@Directive({
  selector: '[floatingContent]',
  standalone: true,
})
export class FloatingContentDirective {
  private surface = inject(FloatingSurface);

  @HostListener('click')
  onClick() {
    this.surface.close();
  }
}

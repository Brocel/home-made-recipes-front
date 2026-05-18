import { Directive, HostListener, inject } from '@angular/core';
import { FloatingSurface } from '@ui/layout/floating-surface/floating-surface';

@Directive({
  selector: '[floatingCloseItem]',
  standalone: true,
})
export class FloatingCloseItemDirective {
  private surface = inject(FloatingSurface);

  @HostListener('click')
  onClick() {
    if (this.surface.strategy() !== 'click') {
      return;
    }
    this.surface.close();
  }
}

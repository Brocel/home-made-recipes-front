import { Directive, HostListener, inject } from '@angular/core';
import { FloatingSurface } from '../components/layout/floating-surface/floating-surface';

@Directive({
  selector: '[floatingTrigger]',
  standalone: true,
})
export class FloatingTriggerDirective {
  private surface = inject(FloatingSurface);

  @HostListener('click')
  onClick() {
    this.surface.toggle();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.surface.strategy() === 'hover') {
      this.surface.open();
    }
  }
}

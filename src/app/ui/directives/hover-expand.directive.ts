import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appHoverExpand]',
  standalone: true,
})
export class HoverExpandDirective {
  // =========================================================
  // Outputs
  // =========================================================
  hovered = output<boolean>();

  // =========================================================
  // Events
  // =========================================================
  @HostListener('mouseenter')
  onMouseEnter() {
    this.hovered.emit(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovered.emit(false);
  }

  @HostListener('focusin')
  onFocusIn() {
    this.hovered.emit(true);
  }

  @HostListener('focusout')
  onFocusOut() {
    this.hovered.emit(false);
  }
}

import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside = output<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;

    if (!target) {
      return;
    }

    // Prevent closing if the click comes from a mat overlay container
    if (target.closest('.cdk-overlay-container')) {
      return;
    }

    const clickedInside = this.el.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.clickOutside.emit();
  }
}

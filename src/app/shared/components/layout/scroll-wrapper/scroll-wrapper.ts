import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-wrapper',
  standalone: true,
  templateUrl: './scroll-wrapper.html',
  styleUrls: ['./scroll-wrapper.scss'],
})
export class ScrollWrapper {
  @Input() gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() padding: 'none' | 'xs' | 'sm' | 'md' | 'lg' = 'none';

  get gapValue() {
    return `var(--space-${this.gap})`;
  }

  get paddingValue() {
    return this.padding === 'none' ? '0' : `var(--space-${this.padding})`;
  }
}

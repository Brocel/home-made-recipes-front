import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { SurfaceOpacity, SurfaceTone } from '@appTypes/style.type';
import { HoverExpandDirective } from '@directives/hover-expand.directive';
import { LayerType } from '@uiTypes/overlay.types';
import { SidePosition } from '@uiTypes/primitive.types';

@Component({
  selector: 'app-side-rail',
  imports: [NgClass, NgStyle, HoverExpandDirective],
  templateUrl: './side-rail.html',
  styleUrl: './side-rail.scss',
})
export class SideRail {
  // =========================================================
  // State
  // =========================================================
  expanded = signal(false);

  // =========================================================
  // Inputs
  // =========================================================
  position = input<SidePosition>('left');
  layer = input<LayerType>('drawer');
  background = input<SurfaceTone>('surface-elevated');
  opacity = input<SurfaceOpacity>('solid');

  minExpandedWidth = input('100px');
  collapsedWidth = input('64px');

  maxHeight = input('auto'); // IMPORTANT: content-driven

  topOffset = input('50%'); // vertical centering anchor

  // =========================================================
  // Outputs
  // =========================================================
  expandedChange = output<boolean>();

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    rail: true,
    'rail--expanded': this.expanded(),
    [`rail--${this.position()}`]: true,
  }));

  // =========================================================
  // Styles
  // =========================================================
  styles = computed(() => ({
    width: this.expanded() ? 'fit-content' : this.collapsedWidth(),
    minWidth: this.expanded() ? this.minExpandedWidth() : this.collapsedWidth(),
    maxHeight: this.maxHeight(),
    top: this.topOffset(),
    zIndex: `var(--z-${this.layer()})`,
    '--rail-bg': `var(--color-${this.background()})`,
    '--rail-opacity': `var(--opacity-${this.opacity()})`,
  }));

  // =========================================================
  // Events
  // =========================================================
  onHover(expanded: boolean) {
    this.expanded.set(expanded);
    this.expandedChange.emit(expanded);
  }
}

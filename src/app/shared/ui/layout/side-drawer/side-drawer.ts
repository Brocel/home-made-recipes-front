import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { SurfaceOpacity, SurfaceTone } from '@appTypes/style.type';
import { LayerType, SidePosition } from '@appTypes/ui.primitive.type';

@Component({
  selector: 'app-side-drawer',
  imports: [NgClass, NgStyle],
  templateUrl: './side-drawer.html',
  styleUrl: './side-drawer.scss',
})
export class SideDrawer {
  // =========================================================
  // Inputs
  // =========================================================
  open = input(false);
  position = input<SidePosition>('left');
  width = input('400px');
  layer = input<LayerType>('drawer');
  background = input<SurfaceTone>('surface-elevated');
  opacity = input<SurfaceOpacity>('solid');

  // =========================================================
  // Outputs
  // =========================================================
  openChange = output<boolean>();

  // =========================================================
  // Computed classes
  // =========================================================
  classes = computed(() => ({
    drawer: true,
    open: this.open(),
    [`drawer--${this.position()}`]: true,
  }));

  handlerClasses = computed(() => ({
    handler: true,
    [`handler--${this.position()}`]: true,
  }));

  chevronClasses = computed(() => ({
    chevron: true,
    open: this.open(),
    [`chevron--${this.position()}`]: true,
  }));

  // =========================================================
  // Computed styles
  // =========================================================
  styles = computed(() => ({
    width: this.width(),
    zIndex: `var(--z-${this.layer()})`,
    '--drawer-bg': `var(--color-${this.background()})`,
    '--drawer-opacity': `var(--opacity-${this.opacity()})`,
  }));

  // =========================================================
  // Actions
  // =========================================================
  toggle() {
    this.openChange.emit(!this.open());
  }
}

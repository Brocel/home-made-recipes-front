import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, contentChild, input } from '@angular/core';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { LayerType, Placement, Position } from '@uiTypes/overlay.types';

@Component({
  selector: 'app-floating-surface',
  imports: [NgClass, NgStyle],
  templateUrl: './floating-surface.html',
  styleUrl: './floating-surface.scss',
})
export class FloatingSurface {
  // =========================================================
  // Content projection
  // =========================================================
  trigger = contentChild(FloatingTriggerDirective);
  content = contentChild(FloatingContentDirective);

  // =========================================================
  // Inputs
  // =========================================================
  position = input<Position>('anchored');
  placement = input<Placement>('bottom-right');
  layer = input<LayerType>('dropdown');
  open = input(false);

  // =========================================================
  // Root Classes
  // =========================================================
  classes = computed(() => ({
    floating: true,
    [`floating--${this.position()}`]: true,
    [`floating--${this.placement()}`]: true,
  }));

  // =========================================================
  // Styles
  // =========================================================
  styles = computed(() => ({
    zIndex: `var(--z-${this.layer()})`,
  }));
}

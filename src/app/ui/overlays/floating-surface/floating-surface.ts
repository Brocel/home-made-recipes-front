import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, contentChild, input } from '@angular/core';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { LayerType, Placement, Position, Tone, Variant } from '@uiTypes/overlay.types';

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
  variant = input<Variant>('surface');
  tone = input<Tone>('elevated');
  layer = input<LayerType>('dropdown');
  open = input(false);

  // =========================================================
  // CLASS MODEL (single source of truth)
  // =========================================================
  private readonly model = computed(() => ({
    isOpen: this.open(),

    position: this.position(),
    placement: this.placement(),

    tone: this.tone(),
    variant: this.variant(),

    layer: this.layer(),
  }));

  // =========================================================
  // Root Classes
  // =========================================================
  classes = computed(() => {
    const m = this.model();

    return {
      floating: true,
      'is-open': m.isOpen,
      [`floating--${m.position}`]: true,
      [`floating--${m.placement}`]: true,
      [`floating--tone-${m.tone}`]: true,
      [`floating--variant-${m.variant}`]: true,
    };
  });

  // =========================================================
  // Styles
  // =========================================================
  styles = computed(() => ({
    zIndex: `var(--z-${this.layer()})`,
  }));
}

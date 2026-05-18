import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, contentChild, input, signal } from '@angular/core';
import {
  FloatingPlacement,
  FloatingPosition,
  LayerType,
  OpeningStrategy,
  SurfaceTone,
  SurfaceVariant,
} from '@appTypes/ui.primitive.type';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { HoverExpandDirective } from '@directives/hover-expand.directive';

@Component({
  selector: 'app-floating-surface',
  imports: [NgClass, NgStyle, HoverExpandDirective, ClickOutsideDirective],
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
  position = input<FloatingPosition>('anchored');
  placement = input<FloatingPlacement>('bottom-right');
  strategy = input<OpeningStrategy>('click');
  variant = input<SurfaceVariant>('surface');
  tone = input<SurfaceTone>('elevated');
  layer = input<LayerType>('dropdown');

  // =========================================================
  // State
  // =========================================================
  open = signal(false);

  // =========================================================
  // Classes
  // =========================================================

  classes = computed(() => ({
    floating: true,

    'is-open': this.open(),

    [`floating--${this.position()}`]: true,

    [`floating--${this.placement()}`]: true,
  }));

  // =========================================================
  // Styles
  // =========================================================

  styles = computed(() => ({
    zIndex: `var(--z-${this.layer()})`,
  }));

  // =========================================================
  // Actions
  // =========================================================
  toggle() {
    if (this.strategy() !== 'click') return;

    this.open.update((v) => !v);
  }

  setOpen(value: boolean) {
    if (this.strategy() !== 'hover') return;

    this.open.set(value);
  }

  close() {
    this.open.set(false);
  }
}

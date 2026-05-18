import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, contentChild, input, output } from '@angular/core';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { HoverExpandDirective } from '@directives/hover-expand.directive';
import { FloatingContentDirective } from '@ui/surfaces/directives/floating-content.directive';
import { FloatingTriggerDirective } from '@ui/surfaces/directives/floating-trigger.directive';
import {
  LayerType,
  OpeningStrategy,
  Placement,
  Position,
  Tone,
  Variant,
} from '@ui/surfaces/primitives/surface.types';

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
  position = input<Position>('anchored');
  placement = input<Placement>('bottom-right');
  strategy = input<OpeningStrategy>('click');
  variant = input<Variant>('surface');
  tone = input<Tone>('elevated');
  layer = input<LayerType>('dropdown');
  open = input(false);

  // =========================================================
  // Outputs
  // =========================================================
  openChange = output<boolean>();

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

    this.openChange.emit(!this.open());
  }

  setOpen(value: boolean) {
    if (this.strategy() !== 'hover') return;

    this.openChange.emit(value);
  }

  close() {
    this.openChange.emit(false);
  }
}

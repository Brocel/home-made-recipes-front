import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Alignment, BaseSize } from '@appTypes/style.type';
import { Direction } from '@appTypes/ui.primitive.type';

@Component({
  selector: 'app-form-layout',
  imports: [NgClass],
  templateUrl: './form-layout.html',
  styleUrl: './form-layout.scss',
})
export class FormLayout {
  // =========================================================
  // Inputs
  // =========================================================
  direction = input<Direction>('column');
  gap = input<BaseSize>('md');
  align = input<Alignment>('stretch');

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    'form-layout': true,
    [`form-layout--${this.direction()}`]: true,
    [`form-layout--gap-${this.gap()}`]: true,
    [`form-layout--align-${this.align()}`]: true,
  }));
}

import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Alignment, BaseSize } from '@appTypes/style.type';
import { Direction } from '@uiTypes/primitive.types';

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

  title = input<string>('');
  subtitle = input<string>('');
  showActions = input<boolean>(false);

  // =========================================================
  // Classes
  // =========================================================
  contentClasses = computed(() => ({
    'form-layout__content': true,
    [`form-layout__content--${this.direction()}`]: true,
    [`form-layout__content--gap-${this.gap()}`]: true,
    [`form-layout__content--align-${this.align()}`]: true,
  }));
}

import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseCva } from '../abstractions/base-cva';

import { BaseSize } from '@appTypes/style.type';

@Component({
  selector: 'app-form-textarea',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-textarea.html',
  styleUrl: './form-textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextarea),
      multi: true,
    },
  ],
})
export class FormTextarea extends BaseCva<string> {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly rows = input(4);
  readonly invalid = input(false);
  readonly size = input<BaseSize>('md');

  readonly placeholder = input('');

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    'form-textarea': true,

    [`form-textarea--${this.size()}`]: true,

    'form-textarea--invalid': this.invalid(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;

    this.updateValue(target.value);
  }
}

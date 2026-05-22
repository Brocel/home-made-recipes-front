import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseCva } from '../abstractions/base-cva';

import { BaseSize } from '@appTypes/style.type';

@Component({
  selector: 'app-form-radio',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-radio.html',
  styleUrl: './form-radio.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadio),
      multi: true,
    },
  ],
})
export class FormRadio extends BaseCva<string> {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly label = input('');
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly invalid = input(false);
  readonly size = input<BaseSize>('md');

  /**
   * Computed checked state.
   */
  protected readonly checked = computed(() => this._value() === this.value());

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    radio: true,

    [`radio--${this.size()}`]: true,

    'radio--invalid': this.invalid(),

    'radio--disabled': this._disabled(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  protected onCheckedChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target.checked) {
      return;
    }

    this.updateValue(this.value());
  }
}

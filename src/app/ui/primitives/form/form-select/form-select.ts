import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseCva } from '../abstractions/base-cva';

import { BaseSize } from '@appTypes/style.type';

export interface SelectOption {
  label: string;

  value: string;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-select.html',
  styleUrl: './form-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelect),
      multi: true,
    },
  ],
})
export class FormSelect extends BaseCva<string> {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly options = input<SelectOption[]>([]);
  readonly invalid = input(false);
  readonly size = input<BaseSize>('md');

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    'form-select': true,

    [`form-select--${this.size()}`]: true,

    'form-select--invalid': this.invalid(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  protected onChangeValue(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.updateValue(target.value);
  }
}

import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseCva } from '../abstractions/base-cva';

import { BaseSize } from '@appTypes/style.type';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckbox),
      multi: true,
    },
  ],
})
export class FormCheckbox extends BaseCva<boolean> {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly label = input('');
  readonly invalid = input(false);
  readonly size = input<BaseSize>('md');

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    choice: true,

    [`choice--${this.size()}`]: true,

    'choice--invalid': this.invalid(),

    'choice--disabled': this._disabled(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  protected onCheckedChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.updateValue(target.checked);
  }
}

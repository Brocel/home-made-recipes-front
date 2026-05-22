import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseSize } from '@appTypes/style.type';
import { InputType } from '@uiTypes/primitive.types';
import { BaseCva } from '../abstractions/base-cva';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true,
    },
  ],
})
export class FormInput extends BaseCva<string> {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly type = input<InputType>('text');
  readonly size = input<BaseSize>('md');
  readonly invalid = input(false);
  readonly fullWidth = input<boolean>(false);

  readonly name = input('');
  readonly placeholder = input('');

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    'form-input': true,

    [`form-input--${this.size()}`]: true,

    'form-input--full': this.fullWidth(),

    'form-input--invalid': this.invalid(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.updateValue(target.value);
  }
}

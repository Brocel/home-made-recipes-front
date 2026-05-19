import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseSize } from '@appTypes/style.type';
import { InputOption } from '@models/form/input-option.model';
import { InputType, PrimitiveValue } from '@uiTypes/primitive.types';

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
export class FormInput implements ControlValueAccessor {
  // =========================================================
  // Configuration inputs
  // =========================================================
  type = input<InputType>('text');
  size = input<BaseSize>('md');
  placeholder = input('');
  invalid = input(false);
  rows = input(4);
  name = input('');
  options = input<InputOption[]>([]);

  // =========================================================
  // Internal mutable state
  // =========================================================
  protected _value = signal<PrimitiveValue>('');
  protected _disabled = signal(false);

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    'form-input': true,

    [`form-input--${this.size()}`]: true,

    'is-invalid': this.invalid(),

    'is-disabled': this._disabled(),
  }));

  // =========================================================
  // ControlValueAccessor
  // =========================================================
  private onChange: (value: unknown) => void = () => {};

  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    // Checkbox / radio
    if (this.type() === 'checkbox' || this.type() === 'radio') {
      this._value.set(Boolean(value));
      return;
    }

    // Standard inputs
    this._value.set((value as string | number | null) ?? '');
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled.set(disabled);
  }

  // =========================================================
  // Events
  // =========================================================
  onValueChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    let nextValue: PrimitiveValue;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      nextValue = target.checked;
    } else {
      nextValue = target.value;
    }

    this._value.set(nextValue);
    this.onChange(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}

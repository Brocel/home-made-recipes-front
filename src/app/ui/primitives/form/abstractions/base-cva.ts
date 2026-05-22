import { signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Shared ControlValueAccessor abstraction.
 */
export abstract class BaseCva<T> implements ControlValueAccessor {
  protected readonly _value = signal<T | null>(null);
  protected readonly _disabled = signal(false);

  protected onChange: (value: T | null) => void = () => {};

  protected onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this._value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled.set(disabled);
  }

  protected updateValue(value: T | null): void {
    this._value.set(value);

    this.onChange(value);
  }

  protected markAsTouched(): void {
    this.onTouched();
  }
}

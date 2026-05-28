import { Component, forwardRef, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseCva } from '../abstractions/base-cva';

@Component({
  selector: 'app-date-picker',
  imports: [FormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
  ],
})
export class DatePicker extends BaseCva<string> {
  // =========================================================
  // Configuration Inputs
  // =========================================================
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly placeholder = input('dd/MM/yyyy');

  // =========================================================
  // ControlValueAccessor Implementation
  // =========================================================
  /**
   * Handle input events from the date field.
   * Updates the form control value and notifies Angular Forms.
   */
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.updateValue(target.value);
  }

  /**
   * Handle blur event to mark the control as touched.
   * Important for showing validation errors on submit.
   */
  protected onBlur(): void {
    this.markAsTouched();
  }
}

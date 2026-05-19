import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [NgClass],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  // =========================================================
  // Inputs
  // =========================================================
  label = input<string>('');
  hint = input<string>('');
  error = input<string>('');
  required = input(false);
  disabled = input(false);

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    'form-field': true,

    'is-disabled': this.disabled(),

    'has-error': !!this.error(),
  }));
}

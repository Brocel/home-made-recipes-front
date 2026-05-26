import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationDisplayMode, ValidationMessageMap } from '@forms/types/validation.type';
import { ValidationMessage } from '../validation-message/validation-message';

@Component({
  selector: 'app-form-field',
  imports: [NgClass, ValidationMessage],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  // =========================================================
  // Inputs
  // =========================================================
  label = input<string>('');
  hint = input<string>('');
  required = input(false);
  disabled = input(false);

  control = input<AbstractControl | null>(null);
  group = input<AbstractControl | null>(null);
  messages = input<ValidationMessageMap | null>(null);
  submitted = input(false);
  showWhen = input<ValidationDisplayMode>('touched');

  readonly effectiveMessages = computed(() => this.messages() ?? {});

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    'form-field': true,
    'is-disabled': this.disabled(),
  }));
}

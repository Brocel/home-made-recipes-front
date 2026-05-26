import type { AbstractControl } from '@angular/forms';

export type ValidationMessageKey = string;
export type ValidationMessage = string;

export type ValidationMessageMap = Partial<Record<ValidationMessageKey, ValidationMessage>>;

export type FormValidationMessages<TFields extends string> = Record<TFields, ValidationMessageMap>;

export type ValidationDisplayMode = 'touched' | 'dirty' | 'submit';

export interface ValidationMessageOptions {
  showWhen?: ValidationDisplayMode;
  priority?: readonly string[];
  fallback?: string | null;
}

export interface ValidationMessageSource {
  control: AbstractControl | null | undefined;
  group?: AbstractControl | null | undefined;
  submitted?: boolean;
}

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidationMessageMap, ValidationMessageOptions } from '@forms/types/validation.type';
import {
  DEFAULT_VALIDATION_OPTIONS,
  DEFAULT_VALIDATION_PRIORITY,
} from '@forms/validations/validation.constants';

/**
 * Returns the first matching error key according to the provided priority.
 */
export function getFirstErrorKey(
  errors: ValidationErrors | null | undefined,
  priority: readonly string[] = DEFAULT_VALIDATION_PRIORITY,
): string | null {
  if (!errors) return null;

  for (const key of priority) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      return key;
    }
  }

  const keys = Object.keys(errors);
  return keys[0] ?? null;
}

/**
 * Tells whether a message should be shown for the control.
 */
export function shouldShowValidationMessage(
  control: AbstractControl | null | undefined,
  submitted = false,
  showWhen: ValidationMessageOptions['showWhen'] = DEFAULT_VALIDATION_OPTIONS.showWhen,
): boolean {
  if (!control || control.disabled || control.pending) return false;
  if (!control.errors) return false;

  switch (showWhen) {
    case 'submit':
      return submitted;

    case 'dirty':
      return control.dirty || submitted;

    case 'touched':
    default:
      return control.touched || submitted;
  }
}

/**
 * Resolves the final translation key / message string to display.
 */
export function resolveValidationMessage(
  control: AbstractControl | null | undefined,
  messages: ValidationMessageMap,
  options: ValidationMessageOptions = {},
  submitted = false,
  group: AbstractControl | null | undefined = control?.parent,
): string | null {
  const mergedOptions = {
    ...DEFAULT_VALIDATION_OPTIONS,
    ...options,
  };

  if (!shouldShowValidationMessage(control, submitted, mergedOptions.showWhen)) {
    return null;
  }

  const priority = mergedOptions.priority ?? DEFAULT_VALIDATION_PRIORITY;

  const controlErrorKey = getFirstErrorKey(control?.errors, priority);
  if (controlErrorKey && messages[controlErrorKey]) {
    return messages[controlErrorKey] ?? null;
  }

  const groupErrorKey = getFirstErrorKey(group?.errors, priority);
  if (groupErrorKey && messages[groupErrorKey]) {
    return messages[groupErrorKey] ?? null;
  }

  return mergedOptions.fallback ?? null;
}

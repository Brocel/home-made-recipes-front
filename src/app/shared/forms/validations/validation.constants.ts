export const DEFAULT_VALIDATION_PRIORITY = [
  'required',
  'email',
  'minlength',
  'maxlength',
  'pattern',
  'usernameTaken',
  'passwordMismatch',
] as const;

export const DEFAULT_VALIDATION_OPTIONS = {
  showWhen: 'touched',
  fallback: null,
} as const;

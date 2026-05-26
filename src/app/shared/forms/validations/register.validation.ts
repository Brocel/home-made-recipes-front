import { RegisterField } from '@forms/constants/register.fields';
import { FormValidationMessages } from '@forms/types/validation.type';

export const REGISTER_VALIDATION_MESSAGES = {
  first_name: {
    required: 'form.validation.first_name',
  },

  last_name: {
    required: 'form.validation.last_name',
  },

  username: {
    required: 'form.validation.username',
    usernameTaken: 'form.validation.username_taken',
    minlength: 'form.validation.username_minlength',
  },

  email: {
    required: 'form.validation.email_required',
    email: 'form.validation.email_invalid',
  },

  password: {
    required: 'form.validation.password_required',
    minlength: 'form.validation.password_minlength',
  },

  confirm_password: {
    required: 'form.validation.confirm_password_required',
    passwordMismatch: 'form.validation.password_mismatch',
  },

  birth_date: {
    required: 'form.validation.birth_date',
  },
} satisfies FormValidationMessages<RegisterField>;

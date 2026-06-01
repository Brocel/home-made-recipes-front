import { RegisterField } from '@forms/constants/register.fields';
import { FormValidationMessages } from '@forms/types/validation.type';

export const REGISTER_VALIDATION_MESSAGES = {
  first_name: {
    required: 'form.validation.firstName',
  },

  last_name: {
    required: 'form.validation.lastName',
  },

  username: {
    required: 'form.validation.username',
    usernameTaken: 'form.validation.usernameTaken',
    minlength: 'form.validation.usernameMinlength',
  },

  email: {
    required: 'form.validation.emailRequired',
    email: 'form.validation.email',
  },

  password: {
    required: 'form.validation.passwordRequired',
    minlength: 'form.validation.passwordMinlength',
  },

  confirm_password: {
    required: 'form.validation.confirmPasswordRequired',
    passwordMismatch: 'form.validation.passwordMismatch',
  },

  birth_date: {
    required: 'form.validation.birthDate',
  },
} satisfies FormValidationMessages<RegisterField>;

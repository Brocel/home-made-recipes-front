import { RegisterForm } from '@forms/models/register-form.model';

export type RegisterRequest = Omit<RegisterForm, 'confirm_password'>;

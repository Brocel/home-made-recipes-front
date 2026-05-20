import { User } from '@models/user';
import { ConfirmType, ModalConfig } from '@uiTypes/modal.types';

export function buildLoginConfig(email?: string): ModalConfig<'login'> {
  return {
    type: 'login',
    data: { email: email },
  };
}

export function buildRegisterConfig(): ModalConfig<'register'> {
  return {
    type: 'register',
  };
}

export function buildProfileConfig(user: User): ModalConfig<'profile'> {
  return {
    type: 'profile',
    data: { user },
  };
}

export function buildConfirmConfig(
  confirmType: ConfirmType,
  title: string,
  msg: string,
  confirmLabel?: string,
  cancelLabel?: string,
): ModalConfig<'confirm'> {
  return {
    type: 'confirm',
    data: { type: confirmType, title: title, message: msg, confirmLabel, cancelLabel },
  };
}

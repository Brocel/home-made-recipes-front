import { User } from '@models/user';
import { ModalConfig } from '@uiModels/modal.model';
import { ConfirmIntent } from '@uiTypes/modal.types';
import { ButtonVariant } from '@uiTypes/primitive.types';

export function buildLoginConfig(email?: string): ModalConfig<'login'> {
  return {
    type: 'login',
    data: { email: email },
  };
}

export function buildRegisterConfig(): ModalConfig<'register'> {
  return {
    type: 'register',
    data: undefined,
  };
}

export function buildProfileConfig(user: User): ModalConfig<'profile'> {
  return {
    type: 'profile',
    data: { user },
  };
}

export function buildConfirmConfig(
  variant: ButtonVariant,
  intent: ConfirmIntent,
  title: string,
  msg: string,
  confirmLabel?: string,
  cancelLabel?: string,
  actionData?: any,
): ModalConfig<'confirm'> {
  return {
    type: 'confirm',
    data: {
      intent: intent,
      variant: variant,
      title: title,
      message: msg,
      confirmLabel,
      cancelLabel,
      actionData,
    },
  };
}

export function buildConfirmResult(cancelled: boolean, actionData?: any) {
  return {
    cancelled: cancelled,
    actionData,
  };
}

export function generateId(): string {
  return crypto.randomUUID();
}
